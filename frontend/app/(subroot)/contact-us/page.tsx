"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCreateContactMutation } from '@/redux/api/rest/mutation/otherApi';
import toast from 'react-hot-toast';

const contactDetails = [
    { icon: 'carbon:location-filled', label: 'Address', value: 'Australia' },
    { icon: 'mi:call', label: 'Phone', value: '9801177833' },
    { icon: 'mdi:email-outline', label: 'Email', value: 'discountdisplays2023@Gmail.Com' },
    { icon: 'mdi:clock-outline', label: 'Time', value: '10:00 AM - 7:00 PM' },
];

const formFields = [
    { type: "text", name: "name", label: "Name", placeholder: "Enter Name" },
    { type: "email", name: "email", label: "Email", placeholder: "Enter Email" },
    { type: "text", name: "subject", label: "Subject", placeholder: "Subject" },
];

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [createContact, { isLoading }] =
        useCreateContactMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createContact(formData).unwrap();
            toast.success("Your message has been sent successfully! ✅");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (err: any) {
            const errorMessage =
                err?.data?.message || "Failed to send message. Please try again later.";
            toast.error(errorMessage);
            console.error("Failed to send contact:", err);
        }
    };

    return (

        <>
            <div
                className="h-full w-full flex items-center justify-center px-4 pt-2 pb-6 bg-[#f3f5f7]"

            >
                <div className="w-full max-w-6xl flex flex-col md:flex-row md:p-8 p-4 md:gap-1 gap-10">
                    {/* Form */}
                    <div className="bg-white w-full md:w-1/2 p-6 rounded-md shadow-xl">
                        <h2 className="lg:text-xl md:text-lg text-base font-cormorant mb-5">Send Message</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full lg:text-base md:text-[13px] text-sm">
                            {formFields.map(({ type, label, name, placeholder }, i) => (
                                <div key={i} className="flex flex-col items-start justify-center gap-2">
                                    <label htmlFor={name}>{label}</label>
                                    <input
                                        id={name}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleChange} className="w-full p-2 border bg-[#FFFFFF]/60 border-[#B0B0B0] outline-0 rounded"
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col items-start justify-center gap-2">
                                <label htmlFor="message">Message</label>

                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-2 border bg-[#FFFFFF]/60 border-[#B0B0B0] outline-0 rounded"
                                />
                            </div>
                            <div className="w-full flex items-center justify-start py-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-[#ffc95c] cursor-pointer font-cormorant md:text-lg text-base lg:text-xl text-white px-7 py-3 rounded hover:bg-[#ffc95c]"
                                >
                                    {isLoading ? "Sending..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full md:w-1/2 lg:px-6 md:px-4 px-2 text-[#333] lg:pl-16 md:pl-8 pl-2 pr-2">
                        <h1>Contact Us</h1>
                        <div className="flex flex-col md:mt-8 mt-4">
                            {contactDetails.map(({ icon, label, value }, idx) => (
                                <div key={idx} className="flex items-center gap-3 mb-4 justify-start">
                                    <div className="bg-[#E7E7E7] rounded-full lg:p-3 p-2">
                                        <Icon icon={icon} className="lg:text-2xl md:text-xl text-lg text-gray-600" />
                                    </div>
                                    <p className="lg:text-base md:text-[15px] text-sm text-[#5D5D5D]">
                                        <span className="lg:text-[17px] md:text-base text-[15px] text-black">{label}:</span> {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ContactPage;
