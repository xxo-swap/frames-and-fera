"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/films", label: "Films" },
  { href: "/inquiry", label: "Inquire" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Close mobile menu automatically on route change
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is active
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

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const links = linksRef.current
        ? Array.from(linksRef.current.children)
        : [];

      tlRef.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        })
        .to(
          menuRef.current,
          {
            y: "0%",
            autoAlpha: 1,
            duration: 0.5,
            ease: "power4.out",
          },
          0
        )
        .fromTo(
          links,
          {
            y: 35,
            autoAlpha: 0,
            rotateX: -10,
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .fromTo(
          footerRef.current,
          {
            y: 15,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
    },
    {
      scope: containerRef,
    }
  );

  const openMenu = () => {
    if (!tlRef.current) return;
    setIsOpen(true);
    tlRef.current.play();
  };

  const closeMenu = () => {
    if (!tlRef.current) return;
    setIsOpen(false);
    tlRef.current.reverse();
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isAtTop || isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* =========================
          MAIN HEADER
      ========================== */}
      <header className="relative top-0 z-[100] w-full px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="group relative z-[110] flex items-center"
          >
            <Image
              src={isHomePage && !isOpen ? "/whiteLogo.png" : "/blackLogo.png"}
              alt="Frames & Fera"
              width={150}
              height={60}
              priority
              className={`h-[60px] w-[80px] scale-90 sm:scale-140 object-contain md:w-[100px] transition-all duration-300 ${
                isHomePage && !isOpen ? " " : ""
              }`}
            />
          </Link>

          {/* =========================
              DESKTOP NAV
          ========================== */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b font-sans text-xs uppercase tracking-[0.2em] py-1 px-2 transition-all duration-300 ${
                    isHomePage
                      ? isActive
                        ? "text-brand-accent border-brand-accent"
                        : "text-brand-accent/90 border-transparent hover:text-brand-accent hover:border-brand-accent/60"
                      : isActive
                      ? "text-brand-text border-brand-text font-medium"
                      : "text-brand-text/70 border-transparent hover:text-brand-text hover:border-brand-text/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={toggleMenu}
            className={`relative z-[110] p-3 transition-colors duration-300 md:hidden cursor-pointer ${
              isHomePage && !isOpen ? "text-brand-accent" : "text-brand-text"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="relative block h-[20px] w-[20px]">
              <Menu
                size={20}
                strokeWidth={1}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />

              <X
                size={20}
                strokeWidth={1}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* =========================
          MOBILE FULLSCREEN MENU
      ========================== */}
      <div
        ref={menuRef}
        className="fixed inset-0 top-0 left-0 h-dvh w-screen z-[90] flex -translate-y-full invisible flex-col justify-between p-8 pt-28 opacity-0 md:hidden bg-brand-bg/95 backdrop-blur-xl border-b border-brand-accent/30 shadow-2xl"
        style={{
          perspective: "1000px",
        }}
      >
        <nav className="my-auto">
          <ul ref={linksRef} className="space-y-6 text-center">
            {navLinks.map((link) => (
              <li key={link.href} className="will-change-transform">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="group relative inline-block p-2 font-serif text-2xl uppercase tracking-wider text-brand-text"
                >
                  <span className="transition-all duration-300 group-hover:italic">
                    {link.label}
                  </span>

                  <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-brand-text transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          ref={footerRef}
          className="border-t border-brand-text/15 pb-6 pt-6 text-center"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
            Cinematic Weddings &amp; Fine Art
          </p>

          <p className="mt-2 font-serif text-sm italic text-brand-text/40">
            Frames &amp; Fera
          </p>
        </div>
      </div>
    </div>
  );
}