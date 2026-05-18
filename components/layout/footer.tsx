import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact" }
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-extrabold text-black/62 transition hover:text-black"
    >
      <span>{label}</span>
      <span className="h-px w-0 bg-black transition-all duration-300 group-hover:w-6" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-white">
      <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-[var(--ft-citrine)] opacity-18 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[var(--ft-blush)] opacity-22 blur-3xl" />

      <div className="ft-container relative py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/brand/foodtheatre-logo.png"
                alt="Food Theatre logo"
                width={112}
                height={112}
                className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
              />

              <div className="min-w-0">
                <p className="mt-3 max-w-md text-sm font-semibold leading-7 text-black/58">
                  A platform for food, culture, and experiences.
                </p>
              </div>
            </Link>

            <p className="mt-8 max-w-xl text-base leading-8 text-black/62">
              Food Theatre connects Experiences, Characters, and Theatre into one world for
              story-led gastronomy, shared tables, local makers, and memorable food culture.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end" aria-label="Footer">
            {footerLinks.map((item) => (
              <FooterLink href={item.href} label={item.label} key={item.href} />
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-black/10 pt-6 text-xs font-semibold text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Food Theatre. A product of Future Food Institute. All rights reserved.</p>
          <p>Food. Culture. Experiences.</p>
        </div>
      </div>
    </footer>
  );
}
