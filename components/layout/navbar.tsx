"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const characterNavItems = [
  {
    label: "Innovators",
    href: "/food-characters#innovators",
    description: "Fresh formats and unexpected food ideas.",
    dotClass: "bg-[var(--ft-pomodori)]",
    hoverClass:
      "hover:border-[var(--ft-pomodori)] hover:bg-[var(--ft-pomodori)]/10"
  },
  {
    label: "Creators",
    href: "/food-characters#creators",
    description: "Food storytellers shaping flavour and mood.",
    dotClass: "bg-[var(--ft-citrine)]",
    hoverClass:
      "hover:border-[var(--ft-citrine)] hover:bg-[var(--ft-citrine)]/20"
  },
  {
    label: "Artisanal",
    href: "/food-characters#artisanal",
    description: "Small makers, craft, and distinctive skill.",
    dotClass: "bg-[var(--ft-viola)]",
    hoverClass: "hover:border-[var(--ft-viola)] hover:bg-[var(--ft-viola)]/10"
  },
  {
    label: "Global",
    href: "/food-characters#global",
    description: "Recipes, traditions, memories, and cultures.",
    dotClass: "bg-[var(--ft-blush)]",
    hoverClass: "hover:border-[var(--ft-blush)] hover:bg-[var(--ft-blush)]/30"
  },
  {
    label: "Wellness",
    href: "/food-characters#wellness",
    description: "Balanced, generous, beautiful food moments.",
    dotClass: "bg-[var(--ft-menta)]",
    hoverClass: "hover:border-[var(--ft-menta)] hover:bg-[var(--ft-menta)]/10"
  },
  {
    label: "FoodCo.s",
    href: "/food-characters#foodcos",
    description: "Restaurants, producers, brands, and operators.",
    dotClass: "bg-[var(--ft-denim)]",
    hoverClass: "hover:border-[var(--ft-denim)] hover:bg-[var(--ft-denim)]/10"
  }
] as const;

const mainNavItems = [
  {
    label: "Experiences",
    href: "/#experiences",
    hasCharacterDropdown: false,
    hoverClass:
      "hover:bg-[var(--ft-denim)] hover:text-white active:bg-[var(--ft-pomodori)] active:text-white"
  },
  {
    label: "Food Characters",
    href: "/food-characters",
    hasCharacterDropdown: true,
    hoverClass:
      "hover:bg-[var(--ft-viola)] hover:text-white active:bg-[var(--ft-menta)] active:text-white"
  },
  {
    label: "Theatres",
    href: "/#theatre",
    hasCharacterDropdown: false,
    hoverClass:
      "hover:bg-[var(--ft-pomodori)] hover:text-white active:bg-[var(--ft-denim)] active:text-white"
  }
] as const;

const actionNavItems = [
  { label: "Be a Character", href: "/#join" },
  { label: "Host a Theatre", href: "/#theatre" }
] as const;

function CharacterDropdown() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[620px] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
      <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/96 p-4 shadow-[0_24px_80px_rgba(17,17,17,0.14)] backdrop-blur-2xl">
        <div className="border-b border-black/10 px-2 pb-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
            Food Characters
          </p>
          <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-black/62">
            Explore the people, makers, brands, and food voices behind each
            experience.
          </p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-2 pt-4">
          {characterNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group/item flex h-full rounded-[1.25rem] border border-black/10 bg-white px-4 py-4 transition duration-300 hover:-translate-y-0.5 ${item.hoverClass}`}
            >
              <span className="flex items-start gap-3">
                <span
                  className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full ${item.dotClass}`}
                  aria-hidden="true"
                />

                <span className="min-w-0">
                  <span className="block text-base font-black leading-none text-black">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-black/56">
                    {item.description}
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/86 backdrop-blur-2xl">
      <nav className="ft-container relative grid h-20 grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[minmax(8rem,1fr)_auto_minmax(8rem,1fr)] lg:gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center justify-self-start ft-focus-ring"
          aria-label="Food Theatre home"
          onClick={closeMenu}
        >
          <Image
            src="/brand/foodtheatre-logo.png"
            alt="Food Theatre logo"
            width={104}
            height={104}
            priority
            className="h-16 w-16 object-contain transition duration-300 group-hover:scale-105 sm:h-[4.45rem] sm:w-[4.45rem]"
          />
        </Link>

        <div className="hidden justify-self-center lg:col-start-2 lg:flex">
          <div className="flex h-[3.25rem] items-center gap-1 rounded-full border border-black/10 bg-white/76 p-1.5 backdrop-blur-xl">
            {mainNavItems.map((item) =>
              item.hasCharacterDropdown ? (
                <div key={item.href} className="group relative flex">
                  <Link
                    href={item.href}
                    aria-haspopup="menu"
                    className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-white px-4 text-sm font-extrabold text-black/66 transition duration-300 hover:-translate-y-0.5 xl:px-5 ${item.hoverClass}`}
                  >
                    {item.label}
                  </Link>

                  <CharacterDropdown />
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-white px-4 text-sm font-extrabold text-black/66 transition duration-300 hover:-translate-y-0.5 xl:px-5 ${item.hoverClass}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="hidden items-center justify-end gap-2 justify-self-end xl:flex">
          {actionNavItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-[var(--ft-citrine)] px-5 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-[var(--ft-menta)] hover:text-white active:bg-[var(--ft-denim)] active:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-black/10 bg-white ft-soft-shadow ft-focus-ring lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-black/10 bg-white px-4 pb-5 lg:hidden"
          >
            <div className="mx-auto flex max-w-xl flex-col gap-2 pt-4">
              {mainNavItems.map((item) =>
                item.hasCharacterDropdown ? (
                  <div
                    key={item.href}
                    className="rounded-[1.6rem] border border-black/10 bg-white p-2"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block rounded-[1.25rem] px-5 py-4 text-base font-extrabold text-black transition duration-300 ${item.hoverClass}`}
                    >
                      {item.label}
                    </Link>

                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {characterNavItems.map((character) => (
                        <Link
                          key={character.href}
                          href={character.href}
                          onClick={closeMenu}
                          className={`rounded-[1.25rem] border border-black/10 bg-white px-4 py-4 transition duration-300 active:scale-[0.98] ${character.hoverClass}`}
                        >
                          <span className="flex items-start gap-3">
                            <span
                              className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full ${character.dotClass}`}
                              aria-hidden="true"
                            />
                            <span>
                              <span className="block text-sm font-black text-black">
                                {character.label}
                              </span>
                              <span className="mt-1 block text-xs font-semibold leading-5 text-black/56">
                                {character.description}
                              </span>
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`rounded-[1.35rem] border border-black/10 bg-white px-5 py-4 text-base font-extrabold text-black transition duration-300 ${item.hoverClass}`}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {actionNavItems.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-[1.35rem] border border-black/10 bg-[var(--ft-citrine)] px-5 py-4 text-center text-base font-extrabold text-black transition duration-300 hover:bg-[var(--ft-menta)] hover:text-white active:bg-[var(--ft-denim)] active:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}