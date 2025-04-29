"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0f1235] to-[#0a0c28] shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[hsl(280,100%,70%)] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-white text-xl font-bold">MapOfWonders</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link href="/" className="text-white hover:text-[hsl(280,100%,70%)]">
            Home
          </Link>
          <Link href="/packages" className="text-white hover:text-[hsl(280,100%,70%)]">
            Packages
          </Link>
          <Link href="/contact" className="text-white hover:text-[hsl(280,100%,70%)]">
            Contact Us
          </Link>
          
          <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="bg-[hsl(280,100%,70%)] text-white rounded-full px-6 py-2 font-semibold no-underline transition hover:bg-[hsl(280,100%,80%)] hover:shadow-md"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-[#0f1235] p-4 shadow-lg md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-[hsl(280,100%,70%)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/packages"
              className="text-white hover:text-[hsl(280,100%,70%)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-[hsl(280,100%,70%)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="block mt-2 bg-[hsl(280,100%,70%)] text-white text-center rounded-full px-6 py-2 font-semibold no-underline transition hover:bg-[hsl(280,100%,80%)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
