'use client';

import { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'success', 'error', 'submitting'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            console.log("inside try, initiated.....");

           const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            console.log("res contains",res);

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                setStatus('error');
                console.error("Submission error:", data.error);
            }
        } catch (error) {
            setStatus('error');
            console.error('Network error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message/Suggestion</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows="4" 
                        value={formData.message}
                        onChange={handleChange}
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
            </div>
            
            <div className="mt-6">
                <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition"
                >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
            </div>

            {status === 'success' && (
                <p className="mt-4 text-center text-green-600 font-medium">Thank you! Your message has been sent.</p>
            )}
            {status === 'error' && (
                <p className="mt-4 text-center text-red-600 font-medium">An error occurred. Please try again later.</p>
            )}
        </form>
    );
}