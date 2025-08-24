import React, { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { useVerifyOtpMutation } from "@/redux/api/rest/mutation/authApi";
import toast from "react-hot-toast";

interface VerifyOtpProps {
    open: boolean;
    onClose: () => void;
    email: string;
}

export const VerifyOtpDialog: React.FC<VerifyOtpProps> = ({
    open,
    onClose,
    email,
}) => {
    const [otp, setOtp] = useState("");

    const [getVerifyOtp, { isLoading }] = useVerifyOtpMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await getVerifyOtp({ email, otp }).unwrap();
            console.log('resss', res);
            toast.success("Email verified successfully!");


        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to verify OTP. Please try again.");
        }
        onClose();

    };

    if (!open) return null; // <-- Only render when open is true

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">

                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Success message */}
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-green-600 w-6 h-6" />
                    <p className="text-green-600 font-semibold">
                        Email sent successfully to <span className="text-gray-800">{email}</span>
                    </p>
                </div>

                {/* OTP form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-gray-700">
                        Enter OTP
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your OTP"
                        />
                    </label>

                    <button
                        type="submit"
                        className={`w-full ${isLoading ? " bg-gray-300 text-black" : "bg-blue-600 hover:bg-blue-700 text-white"}  py-2 rounded-lg font-semibold  transition`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
};
