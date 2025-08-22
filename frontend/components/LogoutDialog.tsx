import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";

interface LogoutType {
    isOpen?: boolean;
    onClose?: () => void;
    onClick?: () => void;
}

const LogoutDialog: React.FC<LogoutType> = ({ isOpen, onClose, onClick }) => {
    if (!isOpen) return null;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen])

    return (
        <div className="fixed md:px-0 px-5 inset-0 flex items-center justify-center z-50 bg-gray-700/40 backdrop-blur-[0.7px]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="px-6 pt-5 pb-8 text-center bg-white rounded-lg shadow-lg">
                <div className="flex flex-row items-end justify-end mb-3 cursor-pointer">
                    <Icon icon="line-md:close-circle-filled" width="24" height="24" onClick={onClose} />
                </div>

                <p className="mb-5 text-lg font-medium">
                    Are you sure you want to log out?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClick}
                        className="px-4 py-2 text-white cursor-pointer bg-[#f82a2a] rounded-lg hover:bg-red-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white cursor-pointer bg-[#489c49] rounded-lg hover:bg-[#397c3a]"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutDialog;
