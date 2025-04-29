"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Head from "next/head";
import Navbar from "~/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1235] to-[#0a0c28] text-white">
      <Head>
        <title>Contact Us - MapOfWonders</title>
        <meta name="description" content="Contact MapOfWonders for inquiries about our travel packages" />
      </Head>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-center text-4xl font-bold">Contact Us</h1>
        
        <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <h2 className="mb-8 text-2xl font-bold text-[hsl(280,100%,70%)]">
            Get In Touch
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <MapPin className="mr-4 mt-1 text-[hsl(280,100%,70%)]" size={24} />
              <div>
                <h3 className="text-xl font-medium">Our Location</h3>
                <p className="mt-2 text-gray-300">
                  NMAM Institute of Technology<br />
                  Nitte<br />
                  Karkala
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="mr-4 mt-1 text-[hsl(280,100%,70%)]" size={24} />
              <div>
                <h3 className="text-xl font-medium">Phone</h3>
                <p className="mt-2 text-gray-300">+91 9480760922</p>
                <p className="text-gray-300">+91 9786326473</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="mr-4 mt-1 text-[hsl(280,100%,70%)]" size={24} />
              <div>
                <h3 className="text-xl font-medium">Email</h3>
                <p className="mt-2 text-gray-300">abhin@nmamit.in</p>
                <p className="text-gray-300">bookings@mapofwonders.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 border-t border-white/20 pt-8">
            <h3 className="mb-4 text-xl font-medium">Business Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
