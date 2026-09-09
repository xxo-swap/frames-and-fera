"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/photography", label: "Photo Gallery" },
  { href: "/films", label: "Films" },
  { href: "/inquire", label: "Inquire" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll visibility logic: visible only when scrolled back to the top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 20) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
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
            duration: 0.65,
            ease: "power4.out",
          },
          0
        )
        .fromTo(
          links,
          {
            y: 50,
            autoAlpha: 0,
            rotateX: -15,
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .fromTo(
          footerRef.current,
          {
            y: 20,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25"
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

  const log = () => {
    console.log("clicked");
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
      <header className="relative top-0 z-[100] w-full   px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link
            onClick={log}
            href="/"
            className="group relative z-[110] flex items-center"
          >
            <Image
              src="/blackLogoC.png"
              alt="Frames & Fera"
              width={150}
              height={60}
              priority
              className="h-auto w-[120px] object-contain md:w-[110px]"
            />
          </Link>

          {/* =========================
              DESKTOP NAV
          ========================== */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b text-brand-primary border-transparent font-sans text-xs uppercase tracking-[0.2em] py-1 px-2 transition-all duration-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={toggleMenu}
            className="relative z-[110] p-3 text-brand-text md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="relative block h-[26px] w-[26px]">
              {/* Menu icon */}
              <Menu
                size={26}
                strokeWidth={1.5}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />

              {/* Close icon */}
              <X
                size={26}
                strokeWidth={1.5}
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
        className="fixed inset-0 z-[90] flex -translate-y-full invisible flex-col justify-between bg-brand-bg p-8 pt-32 opacity-0 md:hidden"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Navigation */}
        <nav className="my-auto">
          <ul ref={linksRef} className="space-y-4 text-center">
            {navLinks.map((link) => (
              <li key={link.href} className="will-change-transform">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="group relative inline-block p-2 font-serif text-5xl uppercase tracking-wide text-brand-text"
                >
                  <span className="transition-all duration-300 group-hover:italic">
                    {link.label}
                  </span>

                  {/* Animated underline */}
                  <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-brand-text transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* =========================
            MOBILE FOOTER
        ========================== */}
        <div
          ref={footerRef}
          className="border-t border-brand-text/15 pb-2 pt-6 text-center"
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