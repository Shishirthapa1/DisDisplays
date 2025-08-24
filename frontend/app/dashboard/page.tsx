"use client";

import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import { VerifyOtpDialog } from '@/components/VerifyOtpDialog';
import { useSendEmailMutation } from '@/redux/api/rest/mutation/authApi';
import { useGetUserByIdQuery } from '@/redux/api/rest/query/queryApi';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

let lastSentTime: number | null = null;

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
    const [verifyDialog, setVerifyDialog] = useState(false);
    const [chnagePassDialog, setChangePassDialog] = useState(false);

    const [getSendEmail] = useSendEmailMutation();

    const handleVerifyNow = async () => {
        const now = Date.now();
        setVerifyDialog(true);

        if (lastSentTime && now - lastSentTime < 60000) {
            toast.error("You can request a new OTP after 1 minute.");
            return;
        }

        console.log("Verify email for:", userData?.email);
        try {
            const res = await getSendEmail({ email: userData?.email }).unwrap();
            console.log('resss', res);
            lastSentTime = now;

            toast.success("Verification email sent! Please check your inbox.");
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to send verification email. Please try again.");
        }
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
                        <div className="flex items-center gap-3">
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium text-sm flex items-center gap-1">
                                ❌ Not Verified
                            </span>
                            <button
                                onClick={handleVerifyNow}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm font-medium"
                            >
                                Verify Now
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={() => setChangePassDialog(true)}>Change Password</button>

            </div>
            <ChangePasswordDialog
                isOpen={chnagePassDialog}
                email={userData?.email || ""}
                onClose={() => setChangePassDialog(false)}
            />
            <VerifyOtpDialog
                email={userData?.email || ""}
                onClose={() => setVerifyDialog(false)}
                open={verifyDialog}
            />
        </div>

    );
}

export default page
