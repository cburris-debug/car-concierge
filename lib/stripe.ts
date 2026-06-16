import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
});

export const TIER_PRICES = {
  advisor: 9900,        // $99.00 in cents
  personal_shopper: 49900, // $499.00 in cents
} as const;

export const UPGRADE_PRICE = 40000; // $400.00 — advisor -> personal_shopper diff

export type Tier = keyof typeof TIER_PRICES;
