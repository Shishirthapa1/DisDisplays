"use client";
import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/api/rest/mutation/authApi";
import toast from "react-hot-toast";
import { z } from "zod";

interface ChangePasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

// Zod schema for frontend validation
const passwordSchema = z.object({
    currentPassword: z.string().min(8, "Current password must be at least 8 characters"),
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")

        .refine((val) => /[a-z]/.test(val), "New password must contain at least one lowercase letter")
        .refine((val) => /[0-9]/.test(val), "New password must contain at least one number"),
});

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
    isOpen,
    onClose,
    email,
}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState({ current: false, new: false });
    const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string }>({});

    const [getChangePassword, { isLoading }] = useChangePasswordMutation();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // validate inputs
        const parsed = passwordSchema.safeParse({ currentPassword, newPassword });
        if (!parsed.success) {
            const fieldErrors: any = {};
            parsed.error.issues.forEach((err) => {
                if (err.path[0] === "currentPassword") fieldErrors.currentPassword = err.message;
                if (err.path[0] === "newPassword") fieldErrors.newPassword = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        if (currentPassword === newPassword) {
            setErrors({ newPassword: "New password cannot be the same as current password" });
            return;
        }

        setErrors({});

        try {
            const res = await getChangePassword({
                email,
                currentPassword,
                newPassword,
            }).unwrap();

            if (res?.success) {
                toast.success("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                onClose();
            } else {
                toast.error(res?.message || "Failed to change password.");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to change password.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Current Password */}
                    <div className="relative">
                        <input
                            type={showPassword.current ? "text" : "password"}
                            placeholder="Current Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2 text-gray-500"
                            onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                        >
                            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            placeholder="New Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2 text-gray-500"
                            onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                        >
                            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-2 rounded-lg text-white font-medium transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordDialog;
