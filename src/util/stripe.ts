import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
    const { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } = process.env;
    if (!NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) return Promise.resolve(null);
    if (!stripePromise) {
        stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};
