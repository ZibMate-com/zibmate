import MotionSection from "../../../components/view/motionComponents"

export const SectionTwo = ()=>{
    return (    
        <section className="w-full p-3 flex gap-25 relative mt-15">
            <div className="w-4/6">
                <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/664fa92a-9ab5-4096-b71c-43bc48369d2c.avif" alt="" />
            </div>
            <div className="absolute w-2xl -bottom-5 right-10 rounded-2xl border border-gray-400 p-15">
                <h1 className="text-4xl font-semibold">Our Story , Your Trusted Stay</h1>
                <p className=" mt-6">Discover how we connect property owners and guests on a single, streamlined platform. Our mission is to simplify management, foster transparency, and create a seamless experience for everyone involved. Learn more about our journey and values.</p>
                <button  className="p-3 w-max bg-orange-500 rounded-2xl text-sm  text-white
             font-semibold mt-6">Read More...</button>
            </div>
        </section>
    )
}