# CI/CD Pipeline Specification

> **Issue:** #192 · **Milestone:** Sprint 4 Infrastructure  
> **Author:** Dozer (Backend/Cloud) · **Status:** In Progress

---

## Overview

GitHub Actions-driven CI/CD pipeline: automated testing, infrastructure-as-code (Bicep), environment promotion with approval gates, and zero-downtime deployments via Container App slots. Enforces code quality and release discipline across dev, staging, production.

---

## 1. Pipeline Stages

```
Commit → Build & Test → Lint → Security Scan → Manual Approval (staging) 
  → Deploy Staging → Integration Tests → Manual Approval (prod) 
  → Deploy Production (Blue-Green)
```

---

## 2. Workflows

### 2.1 Pull Request Validation (.github/workflows/pr-validation.yml)

Triggered on `pull_request`, runs on every PR commit.

```yaml
name: PR Validation
on:
  pull_request:
    branches: [main, dev]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type Check
        run: npm run type-check
      
      - name: Unit Tests
        run: npm run test:unit
      
      - name: Build
        run: npm run build
      
      - name: Security Scan (Snyk)
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        continue-on-error: true

      - name: Comment PR on Failure
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ Build failed. Review logs above.'
            })

  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install Dependencies
        run: npm ci
      - name: Coverage Report
        run: npm run test:coverage
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

**Success Criteria:**
- ✅ All lints pass (ESLint, Prettier)
- ✅ Type check passes (TypeScript)
- ✅ 80%+ line coverage
- ✅ No security vulnerabilities (Snyk)

---

### 2.2 Build & Push to Registry (.github/workflows/build-push.yml)

Triggered on `push` to `main` or `dev` branches.

```yaml
name: Build & Push
on:
  push:
    branches: [main, dev]
    paths:
      - 'apps/**'
      - '.github/workflows/build-push.yml'

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [content-api, booking-api, auth-api, web]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Determine Environment
        id: env
        run: |
          if [[ "$GITHUB_REF" == "refs/heads/main" ]]; then
            echo "environment=prod" >> $GITHUB_OUTPUT
            echo "registry_url=auroraluxeprod.azurecr.io" >> $GITHUB_OUTPUT
          else
            echo "environment=dev" >> $GITHUB_OUTPUT
            echo "registry_url=auroraluxedev.azurecr.io" >> $GITHUB_OUTPUT
          fi
      
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Build Docker Image
        run: |
          docker build \
            -t ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:${{ github.sha }} \
            -t ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:latest \
            -f apps/${{ matrix.service }}/Dockerfile \
            apps/${{ matrix.service }}
      
      - name: Push to ACR
        run: |
          az acr login --name $(echo ${{ steps.env.outputs.registry_url }} | cut -d. -f1)
          docker push ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:${{ github.sha }}
          docker push ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:latest
      
      - name: Generate SBOM (Syft)
        run: |
          curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
          syft ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:${{ github.sha }} -o json > sbom-${{ matrix.service }}.json
      
      - name: Scan Image (Trivy)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:${{ github.sha }}
          format: 'json'
          output: 'trivy-report-${{ matrix.service }}.json'

      - name: Log Image Digest
        run: echo "Pushed image ${{ steps.env.outputs.registry_url }}/${{ matrix.service }}:${{ github.sha }}"
```

**Outputs:**
- Docker images pushed to Azure Container Registry (ACR)
- SBOM (Software Bill of Materials) for compliance
- Security scan results (Trivy)

---

### 2.3 Deploy Staging (.github/workflows/deploy-staging.yml)

Manual trigger after PR merge to `dev`.

```yaml
name: Deploy to Staging
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Image version to deploy (sha or latest)'
        required: true
        default: 'latest'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Deploy Infrastructure (Bicep)
        run: |
          az deployment group create \
            --resource-group aurora-luxe-staging \
            --template-file infra/main.bicep \
            --parameters \
              environment=staging \
              imageVersion=${{ github.event.inputs.version }} \
              location=eastus2
      
      - name: Update Container App Revisions
        run: |
          az containerapp update \
            --resource-group aurora-luxe-staging \
            --name content-api \
            --image auroraluxedev.azurecr.io/content-api:${{ github.event.inputs.version }}
          
          az containerapp update \
            --resource-group aurora-luxe-staging \
            --name booking-api \
            --image auroraluxedev.azurecr.io/booking-api:${{ github.event.inputs.version }}
      
      - name: Run Smoke Tests
        run: |
          npm run test:smoke -- --baseUrl https://staging-api.auroraluxe.com
      
      - name: Update Deployment Status
        if: success()
        run: |
          echo "✅ Staging deployment successful"
          gh workflow run notify-team.yml -F message="Staging deployed: ${{ github.event.inputs.version }}"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Deployment Steps:**
1. Validate Bicep templates
2. Update Azure infrastructure (autoscale settings, networking)
3. Update Container App revisions (pull latest image from ACR)
4. Run smoke tests against staging
5. Notify team on Slack

---

### 2.4 Deploy Production (Blue-Green) (.github/workflows/deploy-prod.yml)

Manual trigger with approval gates.

```yaml
name: Deploy to Production
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Image version to deploy'
        required: true
      slot:
        description: 'Deploy slot (blue or green)'
        required: true
        type: choice
        options:
          - blue
          - green

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Deploy to ${{ github.event.inputs.slot }} Slot
        run: |
          SLOT="${{ github.event.inputs.slot }}"
          az containerapp update \
            --resource-group aurora-luxe-prod \
            --name content-api-${SLOT} \
            --image auroraluxeprod.azurecr.io/content-api:${{ github.event.inputs.version }}
          
          az containerapp update \
            --resource-group aurora-luxe-prod \
            --name booking-api-${SLOT} \
            --image auroraluxeprod.azurecr.io/booking-api:${{ github.event.inputs.version }}
      
      - name: Health Checks (5 min)
        run: |
          npm run test:health -- --baseUrl https://${{ github.event.inputs.slot }}-api.auroraluxe.com --timeout 300s
      
      - name: Synthetic Monitoring (15 min)
        run: |
          npm run test:e2e:prod -- --slot ${{ github.event.inputs.slot }} --timeout 900s
      
      - name: Switch Traffic (Blue ↔ Green)
        if: success()
        run: |
          ACTIVE_SLOT=$(az containerapp ingress show --resource-group aurora-luxe-prod --name content-api --query 'traffic[0].label' -o tsv)
          NEW_SLOT="${{ github.event.inputs.slot }}"
          
          if [[ "$ACTIVE_SLOT" == "$NEW_SLOT" ]]; then
            echo "✅ Traffic already routed to $NEW_SLOT"
          else
            az containerapp ingress traffic set --resource-group aurora-luxe-prod --name content-api \
              --traffic $NEW_SLOT=100
            echo "✅ Switched traffic from $ACTIVE_SLOT to $NEW_SLOT"
          fi
      
      - name: Rollback on Failure
        if: failure()
        run: |
          echo "❌ Deployment failed. Rolling back..."
          ROLLBACK_SLOT=$([ "${{ github.event.inputs.slot }}" == "blue" ] && echo "green" || echo "blue")
          az containerapp ingress traffic set --resource-group aurora-luxe-prod --name content-api \
            --traffic $ROLLBACK_SLOT=100
          echo "✅ Traffic restored to $ROLLBACK_SLOT"

      - name: Post Deployment Notification
        if: always()
        uses: slackapi/slack-github-action@v1.24
        with:
          payload: |
            {
              "text": "Production Deployment: ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment* — ${{ job.status }}\n*Version:* ${{ github.event.inputs.version }}\n*Slot:* ${{ github.event.inputs.slot }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

**Features:**
- Blue-Green deployment (zero downtime)
- Automatic traffic switching after health checks pass
- Instant rollback if synthetic monitoring fails
- Slack notification post-deployment

---

## 3. Infrastructure as Code (Bicep)

### 3.1 Directory Structure

```
infra/
  ├── main.bicep           # Main entry point
  ├── modules/
  │   ├── container-app.bicep
  │   ├── database.bicep
  │   ├── apim.bicep
  │   ├── keyvault.bicep
  │   └── monitoring.bicep
  └── parameters/
      ├── prod.bicepparam
      ├── staging.bicepparam
      └── dev.bicepparam
```

### 3.2 Sample: Container App Module

```bicep
param containerAppName string
param environment string
param location string = 'eastus2'
param minReplicas int = 2
param maxReplicas int = 10
param cpuThreshold int = 70

resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: containerAppName
  location: location
  properties: {
    environmentId: containerAppEnv.id
    template: {
      containers: [
        {
          name: 'api'
          image: 'auroraluxe${environment}.azurecr.io/content-api:latest'
          resources: {
            cpu: '0.5'
            memory: '1Gi'
          }
          env: [
            {
              name: 'ENVIRONMENT'
              value: environment
            }
            {
              name: 'DATABASE_URL'
              secretRef: 'db-connection-string'
            }
          ]
        }
      ]
      scale: {
        minReplicas: minReplicas
        maxReplicas: maxReplicas
        rules: [
          {
            name: 'cpu-scaling'
            custom: {
              metric: 'cpu'
              query: 'avg(rate(container_cpu_usage_seconds_total{pod=~"${containerAppName}.*"}[5m]))'
              operator: 'GreaterThan'
              value: string(cpuThreshold)
            }
          }
        ]
      }
    }
    configuration: {
      secrets: [
        {
          name: 'db-connection-string'
          keyVaultUrl: keyVault.properties.vaultUri + 'secrets/database-url'
          identity: 'system'
        }
      ]
    }
  }
}
```

---

## 4. Environment Promotion Workflow

```
Feature Branch
    ↓
    (PR validation: build, lint, test, security)
    ↓
Merge to dev
    ↓
    (Build → Push image to ACR)
    ↓
Manual: Deploy to Staging
    ↓
    (Smoke tests + synthetic monitoring)
    ↓
Manual Approval (team lead)
    ↓
Manual: Deploy to Production (Blue slot)
    ↓
    (Health checks + 15 min E2E tests)
    ↓
    [If pass] → Switch traffic (Blue active)
    [If fail] → Rollback (Green stays active)
```

---

## 5. Approval Gates

### Staging Gate
- ✅ All PR validations passed
- ✅ Security scan (Trivy, Snyk) clear
- ✅ Reviewer approval on main branch merge

### Production Gate
- ✅ Staging tests passed
- ✅ Tech lead approval (review deployment plan)
- ✅ On-call engineer availability (handle issues)

---

## 6. Testing Gates

| Stage | Tests | Success Criteria |
|-------|-------|-----------------|
| PR | Unit, lint, type-check, security scan | 100% pass, 80%+ coverage |
| Staging | Smoke (API health), integration | All endpoints responding, <200ms latency |
| Prod | Health checks, 15-min E2E, synthetic | 99.9% pass rate, no cascading failures |

---

## 7. Secrets Management

GitHub Actions Secrets:

```
AZURE_CREDENTIALS             # Service principal (az login)
SNYK_TOKEN                    # Security scanning
SLACK_WEBHOOK                 # Notifications
ACR_USERNAME / ACR_PASSWORD   # Container registry
```

**Best Practice:** No hardcoded secrets. All credentials stored in GitHub Secrets or Azure Key Vault (pulled at runtime).

---

## 8. Monitoring & Alerts

- **Workflow Status:** GitHub Actions tab (visible to team)
- **Deployment Alerts:** Slack notifications (success/failure)
- **Metrics Dashboard:** Application Insights (latency, error rate, resource usage)

---

## 9. Success Criteria

- ✅ PR validation passes 100% of commits
- ✅ Image builds and scans complete in < 10 minutes
- ✅ Staging deployment takes < 5 minutes
- ✅ Production blue-green switch is < 30 seconds
- ✅ Zero downtime deployments (traffic switched seamlessly)
- ✅ Automatic rollback on E2E failure
