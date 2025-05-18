"use client";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex px-4 lg:px-28 pt-4 w-full">
      <header className="flex items-center justify-between gap-24 py-4 w-full">
        <Image src="/abstractly.svg" alt="logo" width={112} height={32} />
        <button
          aria-label="Open mobile menu"
          id="mobile-menu-button"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <div
          className={`bg-neutral-950/75 w-full fixed top-0 bottom-0 left-0 z-10 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <nav
            id="slideout-menu"
            className={`p-4 pt-8 lg:hidden fixed top-0 bottom-0 left-0 bg-white w-full transform transition-transform ease-in-out duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <Image
                  src="/abstractly.svg"
                  alt="logo"
                  width={112}
                  height={32}
                />
                <button onClick={() => setIsOpen(false)}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <ul className="flex flex-col items-start gap-8">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>

                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <nav className="grow shrink-0 basis-0 max-lg:hidden">
          <ul className="flex items-center gap-8">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>

            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="flex items-start gap-4 max-lg:hidden">
          <button className="py-[10px] px-4 border-neutral-200 rounded-[4px] bg-white shadow">
            Learn more
          </button>
          <button className="py-[10px] px-4 border-neutral-200 rounded-[4px] bg-indigo-700 text-white shadow">
            See pricing
          </button>
        </div>
      </header>
    </div>
  );
}
