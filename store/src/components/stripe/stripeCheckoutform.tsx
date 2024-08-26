"use client"

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { OrdersProps } from "@/types/orders.types";
import useCart from "@/zustand/cart";

export default function StripeCheckoutForm({ orderData }: { orderData: OrdersProps | undefined }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isElementLoading, setIsElementLoading] = useState(true);

  useEffect(() => {
    if (elements) {
      const element = elements.getElement('payment')
      element?.on('ready', () => {
        setIsElementLoading(false);
      })
    }
  }, [elements])

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const { productsCart, removeItem } = useCart();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `/checkout/success?orderId=${orderData?.id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    if (!error) {
      productsCart.map(product => (
        removeItem(product.product.id)
      ))
    }

    setIsLoading(false);
  };

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>

      <div>
        {isElementLoading === false &&
          <div className='flex items-center pb-3 gap-3'>
            <h3 className="font-semibold text-xl text-headingText">
              Total:
            </h3>
            <p className='text-xl font-bold'>${orderData?.total_amount || "-"}</p>
          </div>
        }
        <div id="payment-form">
          {isElementLoading &&
            <div className="flex items-center justify-center mb-5">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          }
          <PaymentElement />

          {isElementLoading === false &&
            <Button className="w-full mt-4" onClick={(e) => handleSubmit(e)} disabled={isLoading || !stripe || !elements} id="submit">
              {isLoading ?
                "wait..."
                :
                "Pay now"
              }
            </Button>
          }
          {/* Show any error or success messages */}
          {message && <div className="mt-2" id="payment-message">{message}</div>}
        </div>
      </div>

    </div>
  );
}