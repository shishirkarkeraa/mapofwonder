"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "~/components/Navbar";
import Link from "next/link";

// Define the interface for the Wonders
interface Wonder {
  name: string;
  location: string;
  coordinates: [number, number];
  description: string;
}

// Define the wonders of the world with their coordinates and descriptions
const wonders: Wonder[] = [
  {
    name: "Great Wall of China",
    location: "China",
    coordinates: [40.4319, 116.5704],
    description:
      "Built between the 5th century B.C. and the 16th century, the Great Wall of China is a stone-and-earth fortification created to protect the borders of the Chinese Empire from invading Mongols.",
  },
  {
    name: "Petra",
    location: "Jordan",
    coordinates: [30.3285, 35.4444],
    description:
      "Established possibly as early as 312 BC, Petra is famous for its rock-cut architecture and water conduit system.",
  },
  {
    name: "Christ the Redeemer",
    location: "Brazil",
    coordinates: [-22.9519, -43.2105],
    description:
      "Christ the Redeemer is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built between 1922 and 1931.",
  },
  {
    name: "Machu Picchu",
    location: "Peru",
    coordinates: [-13.1631, -72.5450],
    description:
      "Built in the 15th century, Machu Picchu is the most familiar icon of Inca civilization. It's renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.",
  },
  {
    name: "Chichen Itza",
    location: "Mexico",
    coordinates: [20.6843, -88.5677],
    description:
      "Chichen Itza was a large pre-Columbian city built by the Maya people. The archaeological site is located in Tinúm Municipality, Yucatán State, Mexico.",
  },
  {
    name: "Colosseum",
    location: "Italy",
    coordinates: [41.8902, 12.4922],
    description:
      "The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy. Built of concrete and sand, it is the largest amphitheatre ever built.",
  },
  {
    name: "Taj Mahal",
    location: "India",
    coordinates: [27.1751, 78.0421],
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.",
  },
];

// Dynamically import the map components with no SSR
const MapWithNoSSR = dynamic(
  () => import("~/components/Map"), 
  { 
    ssr: false,
    loading: () => (
      <div className="h-[70vh] w-full flex items-center justify-center bg-white/10 rounded-lg">
        <p>Loading Map...</p>
      </div>
    )
  }
);

export default function Home() {
  const [activeWonder, setActiveWonder] = useState<number | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    
    // Initial measurement
    updateNavbarHeight();
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1235] to-[#0a0c28]">
      <div ref={navbarRef} className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main 
        className="flex min-h-screen mt-15 flex-col items-center" 
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <div className="container flex flex-col items-center px-4 py-8">
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Seven Wonders of the World</span>
          </h1>
          
          <div className="w-full max-w-5xl">
            <div className="mb-8 rounded-lg bg-white/10 p-4">
              <p className="text-lg">
                Hover over the markers to learn about the seven wonders of the modern world.
                Click on a marker to see more details.
              </p>
            </div>

            {/* Map Container */}
            <div className="h-[70vh] w-full overflow-hidden rounded-lg relative z-10">
              <MapWithNoSSR 
                wonders={wonders} 
                setActiveWonder={setActiveWonder}
              />
            </div>

            {/* Info Panel */}
            <div className="mt-6 min-h-[150px] rounded-lg bg-white/10 p-4">
              {activeWonder !== null ? (
                <div>
                  <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
                    {wonders[activeWonder]?.name}
                  </h2>
                  <p className="text-lg text-white/80">{wonders[activeWonder]?.location}</p>
                  <p className="mt-2">{wonders[activeWonder]?.description}</p>
                </div>
              ) : (
                <p className="text-center text-lg text-white/80">
                  Hover over a marker to see details about that wonder
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Explore the Wonders of the World?
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Start planning your next adventure today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/packages" 
              className="rounded-full bg-white px-8 py-3 font-bold text-purple-900 transition-colors hover:bg-gray-100"
            >
              Browse Packages
            </Link>
            <Link 
              href="/contact" 
              className="rounded-full border-2 border-white px-8 py-3 font-bold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
