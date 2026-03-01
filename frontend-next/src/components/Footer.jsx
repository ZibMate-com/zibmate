"use client";
import { Copyright, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import React from "react";
import Link from "next/link";
import logo from "../assets/logoblack.png";

const companyLinks = [
  { id: 1, name: "About Us", path: "/about" },
  { id: 2, name: "find PG", path: "/findpg" },
  // { id: 2, name: "Careers", path: "/careers" },
  // { id: 3, name: "Blog", path: "/blog" },
  // { id: 4, name: "Press", path: "/press" },
];

const supportLinks = [
  { id: 1, name: "Help Center", path: "/help" },
  { id: 2, name: "Contact Us", path: "/help" },
  // { id: 3, name: "List Your PG", path: "/list" },
  { id: 4, name: "Claim Your PG", path: "/claim-pg" },
];

const legalLinks = [
  { id: 1, name: "Privacy Policy", path: "/privacy-policy" },
  { id: 2, name: "Terms of Service", path: "/terms" },
  { id: 3, name: "Cookie Policy", path: "/cookie-policy" },
  { id: 4, name: "Disclaimer", path: "/disclaimer" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src={logo.src || logo} alt="Zibmate" />
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              A platform simplifying PG management for owners and tenants, focusing on connection, security, and ease of
              use.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Company</h3>
            <div className="flex flex-col space-y-3 text-gray-400 text-base">
              {companyLinks.map((ele) => (
                <Link key={ele.id} href={ele.path} className="hover:text-orange-500 transition-colors">
                  {ele.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Support</h3>
            <div className="flex flex-col space-y-3 text-gray-400 text-base">
              {supportLinks.map((ele) => (
                <Link key={ele.id} href={ele.path} className="hover:text-orange-500 transition-colors">
                  {ele.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Legal</h3>
            <div className="flex flex-col space-y-3 text-gray-400 text-base">
              {legalLinks.map((ele) => (
                <Link key={ele.id} href={ele.path} className="hover:text-orange-500 transition-colors">
                  {ele.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 space-y-4 md:space-y-0">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Copyright className="size-4" /> {new Date().getFullYear()} ZIBMATE. All rights Reserved.
          </span>

          <div className="flex gap-5 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="size-6 hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="size-6 hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="size-6 hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="size-6 hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="size-6 hover:text-orange-500 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
