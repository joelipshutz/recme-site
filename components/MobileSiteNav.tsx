"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/extensions", label: "Extensions" },
  { href: "/support", label: "Support" }
] as const;

export function MobileSiteNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-site-nav" aria-label="Mobile navigation">
      {mobileLinks.map((link) => {
        const isCurrent = link.href === "/"
          ? pathname === "/"
          : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link aria-current={isCurrent ? "page" : undefined} href={link.href} key={link.href}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
