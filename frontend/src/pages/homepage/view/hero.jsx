import { Heart, RefreshCcw, Sparkle } from 'lucide-react';
export const Hero = ()=>{
    return (
         <div className='w-full p-3 flex gap-25'>
        <div className='w-1/2'>
          <img src="assets/brandon-griggs-wR11KBaB86U-unsplash.jpg" className='rounded-xl w-full h-full' alt="" />
        </div>
        <div className='w-1/3'>
          <h1 className='text-7xl font-semibold'>Manage PG's Connect Simplyfy.</h1>
          <p className='text-xl text-gray-400 mt-8'>A modern platform for owners and tenants to manage paying guest stays, payments, and communication—all in one place.</p>

          <div className='grid grid-cols-2 gap-10 mt-8'>
            <span className='flex items-center gap-2'>
              <Sparkle className='size-6 text-orange-500' />
              Easy Onboarding
            </span>
            <span className='flex items-center gap-2'>
              <RefreshCcw className='size-6 text-orange-500' />
              Secure Payments
            </span>
            <span className='flex items-center gap-2'>
              <Heart className='size-6 text-orange-500' />
              Owner-tenant chat
            </span>
          </div>

           <div className="flex gap-8 mt-8">
                <button className="p-4 w-40 bg-orange-500 rounded-2xl text-white text-md font-semibold">Get Started</button>
               <a href="/features"><button className="p-4 w-36 bg-white rounded-2xl text-md border border-orange-500 text-orange-500 font-semibold">See features</button></a> 
            </div>
        </div>
      </div>
    )
}