import { Copyright, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import { GiHouse } from 'react-icons/gi'
import { NavLink } from 'react-router'

const Footer = () => {
  const company = [
    {
      id: 1,
      name: "About",
      path: "/about"
    },
    {
      id: 2,
      name: "Team",
      path: "/team"
    },
    {
      id: 3,
      name: "Careers",
      path: "/career"
    },
    {
      id: 4,
      name: "Press",
      path: "/press"
    },
    {
      id: 5,
      name: "Blog",
      path: "/blog"
    },

  ]
  const support = [
    {
      id: 1,
      name: "Help",
      path: "/help"
    },
    {
      id: 2,
      name: "FAQ",
      path: "/faq"
    },
    {
      id: 3,
      name: "Contact",
      path: "/contact"
    },
    {
      id: 4,
      name: "Guide",
      path: "/guide"
    },
    {
      id: 5,
      name: "Docs",
      path: "/docs"
    },

  ]
  const Legal = [
    {
      id: 1,
      name: "Terms",
      path: "/terms"
    },
    {
      id: 2,
      name: "Policy",
      path: "/policy"
    },
    {
      id: 3,
      name: "Cookies",
      path: "/cookies"
    },
    {
      id: 4,
      name: "Access",
      path: "/access"
    },
    {
      id: 5,
      name: "Notice",
      path: "/notice"
    },

  ]
  return (
    <div className='w-full h-max bg-black text-white '>
      <div className='flex justify-between items-center w-full p-8'>
        <div className=''>
          <h1 className='text-gray-400'>Company</h1>
          <div className='text-white flex flex-col'>
            {
              company.map((ele) => {
                return (<NavLink to={ele.path}>
                  <h1 key={ele.id} className='text-white hover:underline'>{ele.name}</h1>
                </NavLink>)
              })
            }
          </div>
        </div>
        <div className=''>
          <h1 className='text-gray-400'>Support</h1>
          <div className='text-white flex flex-col'>
            {
              support.map((ele) => {
                return (<NavLink to={ele.path}>
                  <h1 key={ele.id} className='text-white hover:underline'>{ele.name}</h1>
                </NavLink>)
              })
            }
          </div>
        </div>
        <div className=''>
          <h1 className='text-gray-400'>Legal</h1>
          <div className='text-white flex flex-col'>
            {
              Legal.map((ele) => {
                return (<NavLink to={ele.path}>
                  <h1 key={ele.id} className='text-white hover:underline'>{ele.name}</h1>
                </NavLink>)
              })
            }
          </div>
        </div>

      </div>
      <div className=' flex justify-between items-center w-full p-4'>
        <span className='flex items-center gap-2'>All rights Reserved <Copyright /> 2025 zibmate</span>
        <div className=" rounded-2xl  border">
          {/* <GiHouse className="size-6"/>
                    <span className="text-2xl font-bold font-Syne">ZibMate</span> */}
          <img src="assets/logonobg.png" className="w-full h-full object-contain" alt="" />
        </div>
        <div className='text-white flex  gap-4'>
          <Facebook />
          <Instagram />
          <Linkedin />
          <Twitter/>
          <Youtube/>
        </div>
      </div>
    </div>
  )
}

export default Footer