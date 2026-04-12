import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-aurora-bg px-6 text-center">
      <span className="text-aurora-gold font-heading text-[clamp(5rem,15vw,10rem)] font-bold leading-none select-none">
        404
      </span>

      <h1 className="mt-4 font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-aurora-navy">
        Page Not Found
      </h1>

      <p className="mt-3 max-w-md text-aurora-text-muted text-base leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to something extraordinary.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-aurora-gold px-8 py-3 font-heading font-semibold text-white text-sm tracking-wide uppercase transition-colors hover:bg-aurora-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora-gold"
      >
        Return Home
      </Link>

      <span className="mt-12 block text-xs text-aurora-text-muted/60 font-heading tracking-widest uppercase">
        Aurora Luxe
      </span>
    </main>
  );
}
