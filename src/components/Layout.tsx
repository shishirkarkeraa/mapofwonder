"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('[data-testid="navbar"]');
      if (navbar) {
        setNavbarHeight(navbar.getBoundingClientRect().height);
      }
    };

    // Set initial height
    updateNavbarHeight();
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: `${navbarHeight}px` }}>
        {children}
      </main>
    </>
  );
}
