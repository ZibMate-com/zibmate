import { useState, useEffect } from 'react';

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content/homepage_categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return <section className='w-full p-6 md:p-10 mt-10'>
    <h1 className='font-bold text-2xl md:text-4xl'>
      Find Pg and hostel in Loaction away from home
    </h1>
    <div className='w-full grid md:grid-cols-4 grid-cols-1 gap-3 mt-6'>
      {categories.map((category, index) => (
        <span key={index} className='md:w-xs h-52 mb-3 rounded-2xl relative'>
          <h2 className='absolute text-xl font-bold text-white bottom-8 left-3 z-10'> {category.title}</h2>
          <img className='w-full h-full object-cover rounded-2xl' src={category.image_url} alt={category.title} />
          <span className='w-full h-full absolute top-0 opacity-35 rounded-2xl bg-black'></span>
        </span>
      ))}
    </div>
  </section>
}