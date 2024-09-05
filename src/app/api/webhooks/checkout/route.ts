import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const secret = process.env.STRIPE_SIGNING_SECRET as string;
  const signature = headers().get("Stripe-Signature") as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (error) {
    console.error(`Webhook Error: ${error}`);
    return new Response(`Webhook Error: ${error}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  try {
    if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const userId = subscription.metadata.user_id;

      await updateUserSubscription(supabase, userId, {
        stripe_subscription_id: session.subscription as string,
        stripe_customer_id: session.customer as string,
        stripe_current_period_end: new Date(subscription.current_period_end * 1000),
        premium: true
      });
    }

    if (event.type === "invoice.payment_succeeded") {
      // Handle invoice payment succeeded event
      // For example, update payment records in your database
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.user_id;

      await updateUserSubscription(supabase, userId, {
        stripe_current_period_end: new Date(subscription.current_period_end * 1000),
      });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.user_id;

      await updateUserSubscription(supabase, userId, {
        stripe_subscription_id: null,
        stripe_customer_id: null,
        stripe_current_period_end: null,
        premium: false
      });
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    return new Response(`Error processing webhook: ${error}`, { status: 500 })
  }
}

interface UserSubscriptionUpdate {
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  stripe_current_period_end?: Date | null;
  premium?: boolean;
}

async function updateUserSubscription(supabase: SupabaseClient, userId: string, updateData: UserSubscriptionUpdate) {
  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", userId)

  if (error) {
    throw new Error(`Error updating user subscription: ${error.message}`);
  }
}