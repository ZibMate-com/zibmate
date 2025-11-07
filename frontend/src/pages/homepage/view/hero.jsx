import { Heart, RefreshCcw, Sparkle } from 'lucide-react';
import MotionSection from '../../../components/view/motionComponents';
import { useContext } from 'react';
import Mycontext from '../../../features/context/mycontext';
import { Loader } from '../../../components/view/loader';
export const Hero = ()=>{
  const {loading} = useContext(Mycontext);

    if (loading) {
      return <Loader/>
    }
    return (
         <MotionSection className='w-full p-3 flex gap-25'>
        <div className='w-1/2'>
          <img src="assets/brandon-griggs-wR11KBaB86U-unsplash.jpg" className='rounded-xl w-full h-full' alt="" />
        </div>
        <div className='w-1/3'>
          <h1 className='text-7xl font-semibold'>Manage PG's Connect Simplify.</h1>
          <p className='text-xl text-gray-400 mt-8'>A modern platform for owners and tenants to manage paying guest stays, payments, and communication—all in one place.</p>

          <div className='flex gap-10 w-max mt-8'>
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
                <button className="px-4 py-3 w-40 bg-orange-500 rounded-lg text-white text-md font-semibold hover:bg-orange-600 hover:-translate-y-1 transition-all">Get Started</button>
               <a href="/features"><button className="px-4 py-3 w-36 bg-white rounded-lg text-md border border-orange-500 hover:border-orange-600 hover:text-orange-600 text-orange-500 font-semibold hover:-translate-y-1 transition-all">See features</button></a> 
            </div>
        </div>
      </MotionSection>
    )
}