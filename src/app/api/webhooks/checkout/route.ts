import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import Stripe from "stripe";

// https://github.com/shadcn-ui/taxonomy/blob/main/app/api/webhooks/stripe/route.ts example

export async function POST(req: Request) {
  const body = await req.text()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const secret = process.env.STRIPE_SIGNING_SECRET as string || "whsec_dbb83f28f0bc58e88d8a788438b6f542293640b8f1c484027dff534881c60361";
  const signature = headers().get("Stripe-Signature") as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      secret
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    console.log('checkout session completed', event)
    console.log('email', session.customer_email)
    console.log('id', session.metadata?.user_id)

    const response = await supabase
      .from("profiles")
      .update({
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        stripe_current_period_end: new Date(session.expires_at * 1000),
        premium: true
      })
      .eq("email", session.customer_email)

    console.log('reslol', response)
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    console.log('invoice payment succeeded', event)
  }

  if (event.type === "customer.subscription.updated") {
    console.log('customer subscription updated', event)
  }

  if (event.type === "customer.subscription.deleted") {
    console.log('customer subscription deleted', session)
    const response = await supabase
      .from("profiles")
      .update({
        stripe_subscription_id: null,
        stripe_customer_id: null,
        stripe_current_period_end: null,
        premium: false
      })
      .eq("id", session.metadata?.user_id)

    console.log('reslol', response)
  }



  return new Response(null, { status: 200 })
}