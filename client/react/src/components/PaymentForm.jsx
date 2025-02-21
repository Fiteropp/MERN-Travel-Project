import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ bookingId, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const paymentIntentResponse = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}api/createPaymentIntent`,
                    { bookingid: bookingId },
                    { withCredentials: true }
                );
                console.log("Payment Intent Response:", paymentIntentResponse.data); // Debugging
                setClientSecret(paymentIntentResponse.data.clientSecret);
            } catch (error) {
                console.error("Failed to create payment intent:", error); // Debugging
                setError("Failed to create payment intent");
            }
        };

        createPaymentIntent();
    }, [bookingId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        try {
            const cardElement = elements.getElement(CardElement);
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                return;
            }

            console.log("Client Secret:", clientSecret); // Debugging
            const { error: confirmationError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: paymentMethod.id,
                }
            );

            if (confirmationError) {
                setError(confirmationError.message);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                setSuccess(true);
                // Update booking status to paid
                await axios.patch(`${import.meta.env.VITE_BACKEND_URL}api/confirmPayment/${bookingId}`, 
                    { bookingId },
                    { withCredentials: true }
                );
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay {price} €
            </button>
            {error && <div>{error}</div>}
            {success && <div>Payment successful!</div>}
        </form>
    );
};

export default PaymentForm;