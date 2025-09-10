"use client";

import React, { useState } from 'react';

/**
 * Checkout page demonstrating how to request a PaymentIntent from the ERP
 * backend. In a real storefront the amount and currency would come
 * from the cart and the response would be used to render a Stripe
 * payment element. See the existing ERP integration for reference.
 */
export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      // For demo purposes we hardcode an amount; in reality you'd derive this from the cart
      const res = await fetch(`${process.env.NEXT_PUBLIC_ERP_API}/api/payments/web-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5000, currency: 'usd' }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to create payment');
      }
      setClientSecret(data.client_secret);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Demonstration of creating a PaymentIntent via the ERP.</p>
      {error && <p className="text-red-600">{error}</p>}
      {clientSecret ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="font-semibold">PaymentIntent created.</p>
          <code className="block break-all text-sm mt-2">{clientSecret}</code>
        </div>
      ) : (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Create Payment'}
        </button>
      )}
    </div>
  );
}