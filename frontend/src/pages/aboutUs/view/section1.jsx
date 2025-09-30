import MotionSection from "../../../components/view/motionComponents"
export const SectionOne = () => {
    return (
        <section className='w-full p-3 flex gap-25'>
            <div className='w-1/2'>
                <img src="assets/brandon-griggs-wR11KBaB86U-unsplash.jpg" className='rounded-xl w-full h-full' alt="" />
            </div>
            <div className='w-1/2'>
                <h1 className='text-7xl font-semibold'>Manage guests. Simplify payments. Connect owners.</h1>
                <p className='text-xl text-gray-400 mt-8'>A modern platform for seamless PG management—owners and tenants, all in one place. Streamline payments, communication, and daily operations with ease.</p>

                <div className="flex gap-8 mt-8">
                    <button className="p-4 w-40 bg-orange-500 rounded-2xl text-white text-md font-semibold">Get Started</button>
                    <a href="/features"><button className="p-4 w-36 bg-white rounded-2xl text-md border border-orange-500 text-orange-500 font-semibold">See features</button></a>
                </div>
            </div>
        </section>
    )
}