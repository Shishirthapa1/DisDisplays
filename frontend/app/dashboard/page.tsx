"use client";

import { useGetUserByIdQuery } from '@/redux/api/rest/query/queryApi';
import React, { useState, useEffect } from 'react'

const page = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserId(JSON.parse(user).id);
        }
    }, []);

    const { data: userData, isLoading: isUserLoading, isError } = useGetUserByIdQuery(
        { id: userId as string },
        { skip: !userId }
    );

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordChange = () => {
        // Implement your change password logic here
        console.log("Old:", password, "New:", newPassword);
    };

    if (isUserLoading) return <p>Loading user data...</p>;
    if (isError || !userData) return <p>Failed to load user data.</p>;

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Profile</h1>

            <div className="w-full max-w-2xl space-y-6">

                {/* User Info Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">User Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <p><span className="font-medium text-gray-900">Name:</span> {userData.name}</p>
                        <p><span className="font-medium text-gray-900">Email:</span> {userData.email}</p>
                        <p><span className="font-medium text-gray-900">Role:</span> {userData.role}</p>
                        <p><span className="font-medium text-gray-900">Joined:</span> {new Date(userData.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Email Verification Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Email Verification</h2>
                    {userData.status === "verified" ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm flex items-center gap-1">
                            ✅ Verified
                        </span>
                    ) : (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium text-sm flex items-center gap-1">
                            ❌ Not Verified
                        </span>
                    )}
                </div>

                {/* Change Password Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
                    <div className="space-y-3">
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            onClick={handlePasswordChange}
                            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                            Update Password
                        </button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default page
