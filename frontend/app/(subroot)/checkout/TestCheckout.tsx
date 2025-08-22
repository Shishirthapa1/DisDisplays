"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCreatePaymentIntentMutation } from "@/redux/api/rest/mutation/otherApi";
import { selectTotal } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

interface CheckoutFormProps {
    onPaymentSuccess?: () => void;
    submit?: boolean;
    setLoading: (loading: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onPaymentSuccess, submit, setLoading }) => {
    const stripe = useStripe();
    const elements = useElements();
    const total: number = useSelector((state: RootState) => selectTotal(state));
    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);


        try {
            const amountInCents = Math.round(total * 100); // Convert to cents
            const { data, error } = await createPaymentIntent(amountInCents);

            if (error || !data?.clientSecret) {
                setLoading(false);
                toast.error("Payment Failed")
                return;
            }

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                toast.error(result.error.message || "Payment Failed");

            } else if (result.paymentIntent?.status === "succeeded") {
                toast.success("Payment Successful!");
                onPaymentSuccess?.();
            }
        } catch (err) {
            toast.error("Something went wrong.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (submit) {
            handleSubmit();
        }
    }, [submit]);

    return (
        <div className="w-full p-2">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border rounded p-3 bg-gray-100">
                    <CardElement options={{ hidePostalCode: true }} />
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
