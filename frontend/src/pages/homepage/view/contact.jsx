import React, { useState } from 'react'
// ...existing imports...
import { FAQ } from '../model/homepage';
import MotionSection from '../../../components/view/motionComponents';
const Contact = () => {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        agreement: false,
    });
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!form.firstname.trim()) newErrors.firstname = 'First name required';
        if (!form.lastname.trim()) newErrors.lastname = 'Last name required';
        if (!form.email.trim()) newErrors.email = 'Email required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
        if (!form.message.trim()) newErrors.message = 'Message required';
        if (!form.agreement) newErrors.agreement = 'You must agree to the policy';
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
            setSubmittedData(form);
            alert('Form submitted!');
            setForm({
                firstname: '',
                lastname: '',
                email: '',
                message: '',
                agreement: false,
            })
        }
    };

    return (
        <MotionSection className='w-full p-6 md:p-10 md:flex justify-between gap-4'>
            <div className='w-1/2'>
                <h2 className='md:text-lg text-2xl text-gray-500'>
                    FAQ's
                </h2>
                <h1 className='text-4xl font-bold'>Frequently Asked Questions.</h1>
                <ul className='flex flex-col gap-4 mt-4'>
                    {
                        FAQ.map((faq) => {
                            return (
                                <div key={faq.id} className=' p-4 rounded-lg shadow-md border border-gray-400 hover:scale-105 transition-all'>
                                    <h1 className='font-semibold text-2xl'>{faq.question}</h1>
                                    <p className='text-gray-500'>{faq.answer}</p>
                                </div>
                            )
                        })
                    }

                </ul>
            </div>
            <div className='text-center '>
                <h1 className='text-lg text-gray-500 '>Contact and Support</h1>
                <h2 className='text-4xl text-black font-bold'>Reach out to us</h2>
                <form
                    className='flex flex-col gap-8 mt-4  p-10  border border-gray-500 rounded-2xl'
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <span>
                        <input
                            type="text"
                            name='firstname'
                            placeholder='firstname'
                            className='border border-gray-500 mr-2 p-2 rounded-md'
                            value={form.firstname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='lastname'
                            placeholder='lastname'
                            className='border border-gray-500 p-2  rounded-md'
                            value={form.lastname}
                            onChange={handleChange}
                        />
                    </span>
                    {errors.firstname && <div className="text-red-500 text-sm text-left">{errors.firstname}</div>}
                    {errors.lastname && <div className="text-red-500 text-sm text-left">{errors.lastname}</div>}
                    <input
                        type="text"
                        name='email'
                        placeholder='email'
                        className='border border-gray-500  p-2 rounded-md'
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="text-red-500 text-sm text-left">{errors.email}</div>}
                    <textarea
                        name="message"
                        placeholder='message'
                        className='border border-gray-500 p-2 rounded-md'
                        value={form.message}
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && <div className="text-red-500 text-sm text-left">{errors.message}</div>}
                    <span className='text-start flex items-center'>
                        <input
                            type="checkbox"
                            name="agreement"
                            className='mr-3 w-6 h-6'
                            checked={form.agreement}
                            onChange={handleChange}
                        />
                        I agree to the <u className='text-orange-500'>policy</u>
                    </span>
                    {errors.agreement && <div className="text-red-500 text-sm text-left">{errors.agreement}</div>}
                    <button
                        type="submit"
                        className="p-4 w-full bg-orange-500 rounded-2xl text-white text-md font-semibold mt-6"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </MotionSection>
    )
}

export default Contact