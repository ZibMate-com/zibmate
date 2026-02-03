"use client";
import React, { useState, useContext, useEffect } from 'react';

import MotionSection from '../../../components/view/motionComponents';
import Mycontext from '../../../context/mycontext';
import { Loader } from '../../../components/view/loader';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, User, MessageSquare, ShieldCheck } from 'lucide-react';

const Contact = () => {
    const { loading } = useContext(Mycontext);
    const [faqData, setFaqData] = useState([]);
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                const response = await fetch(`${baseUrl}/api/content/faq`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) throw new Error('Failed to fetch FAQs');
                const data = await response.json();
                setFaqData(data.map(f => ({
                    id: f.id,
                    question: f.title,
                    answer: f.content
                })));
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };
        fetchFaqs();
    }, []);

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        agreement: false,
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.firstname.trim()) newErrors.firstname = 'First name required';
        if (!form.lastname.trim()) newErrors.lastname = 'Last name required';
        if (!form.email.trim()) newErrors.email = 'Email required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
        if (!form.message.trim()) newErrors.message = 'Message required';
        if (!form.agreement) newErrors.agreement = 'Required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            alert('Message sent successfully!');
            setForm({ firstname: '', lastname: '', email: '', message: '', agreement: false });
        }
    };

    if (loading) return <Loader />;

    return (
        <MotionSection className='relative w-full py-20 px-6 max-w-7xl mx-auto' id="contact">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />

            <div className='flex flex-col lg:flex-row gap-16 justify-between'>

                {/* Left Side: FAQs */}
                <div className='w-full lg:w-1/2'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className='mb-10'
                    >
                        <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">Support Center</span>
                        <h1 className='text-4xl md:text-5xl font-bold mt-2 text-gray-900'>Frequently Asked <span className='text-orange-500'>Questions.</span></h1>
                        <p className='text-gray-500 mt-4 text-lg'>Can't find what you're looking for? Reach out to our team.</p>
                    </motion.div>

                    <div className='space-y-4'>
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`border rounded-2xl transition-all duration-300 ${activeFaq === index ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 bg-white'}`}
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className='w-full p-5 flex justify-between items-center text-left'
                                >
                                    <span className='font-bold text-lg text-gray-800'>{faq.question}</span>
                                    <ChevronDown className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className='overflow-hidden'
                                        >
                                            <p className='px-5 pb-5 text-gray-600 leading-relaxed'>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className='w-full lg:w-[450px]'
                >
                    <div className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100'>
                        <div className="mb-8">
                            <h2 className='text-3xl font-bold text-gray-900'>Reach out to us</h2>
                            <p className="text-gray-500 mt-2">We typically respond within 2 hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-5'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-3 size-4 text-gray-400' />
                                        <input
                                            type="text" name='firstname' placeholder='First Name'
                                            className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black placeholder-black'
                                            value={form.firstname} onChange={handleChange}
                                        />
                                    </div>
                                    {errors.firstname && <p className="text-red-500 text-xs ml-1">{errors.firstname}</p>}
                                </div>
                                <div className='space-y-1'>
                                    <input
                                        type="text" name='lastname' placeholder='Last Name'
                                        className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black placeholder-black'
                                        value={form.lastname} onChange={handleChange}
                                    />
                                    {errors.lastname && <p className="text-red-500 text-xs ml-1">{errors.lastname}</p>}
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-3 size-4 text-gray-400' />
                                    <input
                                        type="email" name='email' placeholder='Email Address'
                                        className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black placeholder-black'
                                        value={form.email} onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                            </div>

                            <div className='space-y-1'>
                                <div className='relative'>
                                    <MessageSquare className='absolute left-3 top-3 size-4 text-gray-400' />
                                    <textarea
                                        name="message" placeholder='Your message...' rows={4}
                                        className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none text-black placeholder-black'
                                        value={form.message} onChange={handleChange}
                                    />
                                </div>
                                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
                            </div>

                            <div className='space-y-1'>
                                <label className='flex items-start gap-3 cursor-pointer group'>
                                    <input
                                        type="checkbox" name="agreement"
                                        className='mt-1 size-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer'
                                        checked={form.agreement} onChange={handleChange}
                                    />
                                    <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>
                                        I agree to the <u className='text-orange-500 decoration-orange-200 hover:decoration-orange-500 transition-all'>privacy policy</u>
                                    </span>
                                </label>
                                {errors.agreement && <p className="text-red-500 text-xs ml-1">{errors.agreement}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </MotionSection>
    );
};

export default Contact;