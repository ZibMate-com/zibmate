import { Copyright, Facebook, Instagram, Linkedin, Twitter, Youtube, Home } from 'lucide-react'
import React from 'react'
import { GiHouse } from 'react-icons/gi'
import { NavLink } from 'react-router'

const Footer = () => {
  const company = [
    { id: 1, name: "About", path: "/about" },
    { id: 2, name: "Team", path: "/team" },
    { id: 3, name: "Careers", path: "/career" },
    { id: 4, name: "Press", path: "/press" },
    { id: 5, name: "Blog", path: "/blog" },
  ];
  const support = [
    { id: 1, name: "Help", path: "/help" },
    { id: 2, name: "FAQ", path: "/faq" },
    { id: 3, name: "Contact", path: "/contact" },
    { id: 4, name: "Guide", path: "/guide" },
    { id: 5, name: "Docs", path: "/docs" },
  ];
  const legal = [
    { id: 1, name: "Terms", path: "/terms" },
    { id: 2, name: "Policy", path: "/policy" },
    { id: 3, name: "Cookies", path: "/cookies" },
    { id: 4, name: "Access", path: "/access" },
    { id: 5, name: "Notice", path: "/notice" },
  ];

  return (
    <footer className='w-full bg-zinc-950 text-white pt-16 pb-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10'>
          <div className='col-span-2 md:col-span-1'>
            <a href="/" className="flex items-center gap-2 mb-4">
             <img src="assets/logonobg.png" className='' alt="" />
            </a>
            <p className='text-sm text-gray-400 max-w-xs'>
              A platform simplifying PG management for owners and tenants, focusing on connection, security, and ease of use.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-300 mb-4'>Company</h3>
            <div className='flex flex-col space-y-3 text-gray-400 text-base'>
              {company.map((ele) => (
                <a key={ele.id} href={ele.path} className='hover:text-orange-500 transition-colors'>
                  {ele.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-300 mb-4'>Support</h3>
            <div className='flex flex-col space-y-3 text-gray-400 text-base'>
              {support.map((ele) => (
                <a key={ele.id} href={ele.path} className='hover:text-orange-500 transition-colors'>
                  {ele.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-300 mb-4'>Legal</h3>
            <div className='flex flex-col space-y-3 text-gray-400 text-base'>
              {legal.map((ele) => (
                <a key={ele.id} href={ele.path} className='hover:text-orange-500 transition-colors'>
                  {ele.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center pt-6 space-y-4 md:space-y-0'>

          <span className='flex items-center gap-2 text-sm text-gray-500'>
            <Copyright className='size-4' /> 2025 ZibMate. All rights Reserved.
          </span>

          <div className='flex gap-5 text-gray-400'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className='size-6 hover:text-orange-500 transition-colors' /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className='size-6 hover:text-orange-500 transition-colors' /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin className='size-6 hover:text-orange-500 transition-colors' /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter className='size-6 hover:text-orange-500 transition-colors' /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube className='size-6 hover:text-orange-500 transition-colors' /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}


export default Footer