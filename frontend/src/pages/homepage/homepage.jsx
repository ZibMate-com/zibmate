import React from 'react'
import "../../pages/page.css"
import Contact from './view/contact';
import { About } from './view/AboutPage';
import { Categories } from './view/Cartegories';
import { Toplistsection } from './view/Toplistsection';
import { Brandshowcase } from './view/brandShowcase';
// import { Search } from '../../components/view/SearchSection';
const Home = () => {
  return (
    <section className='h-auto'>
      <div className='w-full relative  '>
       <div >
        <img className='w-full max-h-120 object-fill' src="public/assets/brandon-griggs-wR11KBaB86U-unsplash.jpg" alt="" />
        </div> 
        {/* <div className='w-full h-full absolute bg-black top-0 opacity-15'/> */}
        <div className='absolute w-full h-full top-0 z-10 p-8'>
          {/* <h1 className='text-gray-300 font-bold md:text-4xl text-2xl'>Find Pg that feels like Home</h1> */}
        </div>
        {/* <Search/> */}
      </div>
      <About />
      <Brandshowcase/>
      <Categories />
     <Toplistsection />
       <Contact/> 
    </section>
  )
}

export default Home