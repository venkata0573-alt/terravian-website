"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { business } from "@/content/business";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";

/**
 * Primary navigation.
 * Desktop: Services dropdown supports Enter, Space, Escape, ArrowUp, ArrowDown.
 * Mobile: accessible menu button with aria-expanded / aria-controls.
 */
const topLevelLinks = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const firstServiceLinkRef = useRef<HTMLAnchorElement>(null);

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown on outside pointer interaction
  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [dropdownOpen, closeDropdown]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onServicesButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setDropdownOpen(true);
      // Move focus to the first menu item when opened via keyboard
      requestAnimationFrame(() => firstServiceLinkRef.current?.focus());
    } else if (e.key === "Escape" && dropdownOpen) {
      e.preventDefault();
      closeDropdown();
      servicesButtonRef.current?.focus();
    }
  };

  const onDropdownKeyDown = (e: React.KeyboardEvent) => {
    const items = Array.from(
      dropdownRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]") ?? [],
    );
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeDropdown();
      servicesButtonRef.current?.focus();
    }
  };

  const linkCls = (href: string) =>
    `px-3 py-2 text-[0.9375rem] font-semibold transition-colors duration-fast ease-brand hover:text-earth ${
      isActive(href) ? "text-forest underline underline-offset-8" : "text-charcoal"
    }`;

  return (
    <>
      {/* Desktop navigation */}
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          <li>
            <Link
              href="/"
              className={linkCls("/")}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <div ref={dropdownRef} className="relative">
              <button
                ref={servicesButtonRef}
                type="button"
                aria-expanded={dropdownOpen}
                aria-controls="services-menu"
                aria-haspopup="true"
                onClick={() => setDropdownOpen((v) => !v)}
                onKeyDown={onServicesButtonKeyDown}
                className={`flex items-center gap-1 px-3 py-2 text-[0.9375rem] font-semibold transition-colors duration-fast ease-brand hover:text-earth ${
                  isActive("/services") ? "text-forest underline underline-offset-8" : "text-charcoal"
                }`}
              >
                Services
                <ChevronDownIcon size={16} className={`transition-transform duration-fast ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen ? (
                <ul
                  id="services-menu"
                  aria-label="Services"
                  onKeyDown={onDropdownKeyDown}
                  className="absolute left-0 top-full z-50 mt-1 w-72 border border-charcoal/10 bg-white py-2 shadow-lg"
                >
                  {services.map((s, i) => (
                    <li key={s.slug}>
                      <Link
                        ref={i === 0 ? firstServiceLinkRef : undefined}
                        data-menu-item
                        href={`/services/${s.slug}`}
                        aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                        className="block px-4 py-2.5 text-[0.9375rem] font-medium text-charcoal transition-colors duration-fast hover:bg-tint hover:text-forest"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
          {topLevelLinks.slice(1).map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={linkCls(l.href)}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        className="p-2 text-charcoal lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <MenuIcon size={26} className="hidden" /> : null}
        {mobileOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
      </button>

      {/* Mobile navigation panel */}
      {mobileOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full z-50 border-t border-charcoal/10 bg-white shadow-lg lg:hidden"
        >
          <ul className="container-site flex flex-col py-4">
            <li>
              <MobileLink href="/" label="Home" active={isActive("/")} />
            </li>
            <li>
              <p className="mt-3 px-1 text-xs font-semibold uppercase tracking-[0.08em] text-earth">
                Services
              </p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <MobileLink
                      href={`/services/${s.slug}`}
                      label={s.name}
                      active={pathname === `/services/${s.slug}`}
                    />
                  </li>
                ))}
              </ul>
            </li>
            {topLevelLinks.slice(1).map((l) => (
              <li key={l.href}>
                <MobileLink href={l.href} label={l.label} active={isActive(l.href)} />
              </li>
            ))}
            <li className="mt-4 border-t border-charcoal/10 pt-4">
              <a
                href={business.phoneHref}
                className="block px-1 py-2 font-semibold text-forest"
              >
                Call {business.phone}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}

function MobileLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block px-1 py-2.5 text-base font-semibold ${
        active ? "text-forest underline underline-offset-8" : "text-charcoal"
      }`}
    >
      {label}
    </Link>
  );
}
