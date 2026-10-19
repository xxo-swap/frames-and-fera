"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/films", label: "Films" },
  { href: "/inquiry", label: "Inquire" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Close drawer on route navigation
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [pathname]);

  // Lock body scroll during open drawer
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useGSAP(
    () => {
      const links = linksRef.current
        ? Array.from(linksRef.current.children)
        : [];

      tlRef.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        })
        .to(
          menuRef.current,
          {
            y: "0%",
            autoAlpha: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          0
        )
        .fromTo(
          links,
          { y: 25, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .fromTo(
          footerRef.current,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  const openMenu = useCallback(() => {
    if (!tlRef.current) return;
    setIsOpen(true);
    tlRef.current.play();
  }, []);

  const closeMenu = useCallback(() => {
    if (!tlRef.current) return;
    setIsOpen(false);
    tlRef.current.reverse();
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) closeMenu();
    else openMenu();
  }, [isOpen, openMenu, closeMenu]);

  return (
    <header
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-brand-bg/95 backdrop-blur-md border-b border-brand-accent/40 transition-colors duration-200"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link
          href="/"
          className="relative z-[110] flex items-center focus:outline-none"
          aria-label="Frames and Fera Home"
        >
          <Image
            src="/blackLogo.png"
            alt="Frames & Fera Logo"
            width={120}
            height={48}
            priority
            className="h-16 w-auto object-contain transition-transform duration-300 hover:opacity-85"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-8 md:flex" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-xs uppercase tracking-[0.16em] py-1 border-b transition-all duration-200 ${
                  isActive
                    ? "text-brand-text border-brand-text font-medium"
                    : "text-brand-text/70 border-transparent hover:text-brand-text hover:border-brand-accent/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Trigger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="relative z-[110] flex items-center gap-2 p-2 text-brand-text font-sans text-xs uppercase tracking-widest md:hidden cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <span className="relative block h-5 w-5">
            <Menu
              size={18}
              strokeWidth={1.5}
              className={`absolute inset-0 transition-transform duration-300 ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              size={18}
              strokeWidth={1.5}
              className={`absolute inset-0 transition-transform duration-300 ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 top-0 left-0 h-dvh w-screen z-[90] flex -translate-y-full invisible flex-col justify-between p-8 pt-28 opacity-0 md:hidden bg-brand-bg/98 backdrop-blur-xl border-b border-brand-accent/40"
      >
        <nav className="my-auto">
          <ul ref={linksRef} className="space-y-6 text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="font-serif text-3xl uppercase tracking-wider text-brand-text hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          ref={footerRef}
          className="border-t border-brand-accent/30 pb-6 pt-6 text-center font-sans"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
            Weddings &amp; Fine Art
          </p>
          <p className="mt-1 font-serif text-sm italic text-brand-text/50">
            Frames and Fera
          </p>
        </div>
      </div>
    </header>
  );
}