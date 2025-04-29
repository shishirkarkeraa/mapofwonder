"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-[#2e026d]/90 backdrop-blur-sm fixed w-full z-50" data-testid="navbar">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[hsl(280,100%,70%)] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-white text-xl font-bold">MapOfWonders</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-[hsl(280,100%,70%)] transition">
            Home
          </Link>
          <Link href="/packages" className="text-white hover:text-[hsl(280,100%,70%)] transition">
            Packages
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
        <div className="md:hidden bg-[#2e026d] pb-4 px-4">
          <Link 
            href="/" 
            className="block py-2 text-white hover:text-[hsl(280,100%,70%)]"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/packages" 
            className="block py-2 text-white hover:text-[hsl(280,100%,70%)]"
            onClick={() => setIsMenuOpen(false)}
          >
            Packages
          </Link>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="block mt-2 bg-[hsl(280,100%,70%)] text-white text-center rounded-full px-6 py-2 font-semibold no-underline transition hover:bg-[hsl(280,100%,80%)]"
            onClick={() => setIsMenuOpen(false)}
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      )}
    </nav>
  );
}
