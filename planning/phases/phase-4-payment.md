# Phase 4: Payment Integration

## Overview

دمج بوابات الدفع المختلفة.

## Duration: 5-7 Days

## Prerequisites
- Phase 0, 1, 2 & 3 completed
- Payment gateway accounts

## Tasks

### Task 4.1: Payment Gateway Setup
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create Stripe Account (for cards)
  - Go to stripe.com
  - Create account
  - Get API keys
  - Configure webhooks
- [ ] Create Fawry Account (for mobile wallets)
  - Go to fawry.com
  - Create merchant account
  - Get API credentials
- [ ] Install payment libraries
  ```bash
  npm install stripe @stripe/stripe-js
  ```
- [ ] Configure environment variables
  ```env
  STRIPE_SECRET_KEY=""
  STRIPE_PUBLISHABLE_KEY=""
  STRIPE_WEBHOOK_SECRET=""
  FAWRY_MERCHANT_ID=""
  FAWRY_SECURITY_CODE=""
  ```

### Task 4.2: Stripe Integration
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create Stripe utilities
  ```typescript
  // src/lib/payments/stripe.ts
  import Stripe from 'stripe';
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
  export async function createPaymentIntent(amount: number) { ... }
  export async function confirmPayment(paymentIntentId: string) { ... }
  export async function createRefund(paymentIntentId: string) { ... }
  ```
- [ ] Create checkout session
  ```typescript
  // src/app/api/payments/checkout/route.ts
  export async function POST(req: Request) {
    const { items, shippingAddress } = await req.json();
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [...],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });
    
    return NextResponse.json({ sessionId: session.id });
  }
  ```
- [ ] Create Stripe Elements form
  ```typescript
  // src/components/checkout/StripeCheckout.tsx
  'use client';
  
  import { loadStripe } from '@stripe/stripe-js';
  import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
  
  export function StripeCheckout() { ... }
  ```
- [ ] Handle Stripe webhooks
  ```typescript
  // src/app/api/webhooks/stripe/route.ts
  export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature')!;
    
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    
    switch (event.type) {
      case 'checkout.session.completed':
        // Fulfill order
        break;
      case 'payment_intent.payment_failed':
        // Handle failure
        break;
    }
  }
  ```

### Task 4.3: Mobile Wallet Integration
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create Fawry utilities
  ```typescript
  // src/lib/payments/fawry.ts
  export async function createFawryPayment(orderId: string, amount: number) { ... }
  export async function checkFawryStatus(paymentId: string) { ... }
  ```
- [ ] Create InstaPay integration
  ```typescript
  // src/lib/payments/instapay.ts
  export async function createInstaPayPayment(orderId: string, amount: number) { ... }
  ```
- [ ] Create payment selection UI
  ```typescript
  // src/components/checkout/PaymentMethods.tsx
  export function PaymentMethods() {
    return (
      <div className="space-y-4">
        <PaymentOption icon="💳" label="Credit/Debit Card" />
        <PaymentOption icon="📱" label="Vodafone Cash" />
        <PaymentOption icon="📱" label="Orange Cash" />
        <PaymentOption icon="📱" label="Etisalat Cash" />
        <PaymentOption icon="📱" label="InstaPay" />
        <PaymentOption icon="💵" label="Cash on Delivery" />
      </div>
    );
  }
  ```
- [ ] Handle payment callbacks

### Task 4.4: Cash on Delivery
**Priority**: Medium
**Duration**: 0.5 day

#### Subtasks:
- [ ] COD validation
- [ ] COD order processing
- [ ] COD confirmation flow

### Task 4.5: Payment Status & Receipts
**Priority**: Medium
**Duration**: 0.5 day

#### Subtasks:
- [ ] Payment status tracking
- [ ] Receipt generation
- [ ] Email receipts
- [ ] PDF receipts

## Deliverables

- [ ] Stripe integration working
- [ ] Mobile wallet integration
- [ ] COD support
- [ ] Webhook handling
- [ ] Payment receipts

## Verification

- [ ] Card payment works
- [ ] Mobile wallet works
- [ ] COD works
- [ ] Webhooks process correctly
- [ ] Receipts generate

## API Routes Created

```
POST   /api/payments/checkout         - Create checkout session
POST   /api/payments/stripe           - Process Stripe payment
POST   /api/payments/fawry            - Process Fawry payment
POST   /api/payments/instapay         - Process InstaPay
POST   /api/payments/cod              - Process COD
GET    /api/payments/[id]/status      - Check payment status
POST   /api/webhooks/stripe           - Stripe webhook
POST   /api/webhooks/fawry            - Fawry webhook
```

## Notes

- Always verify webhooks
- Handle payment failures gracefully
- Implement retry logic
- Log all payment events
- Never expose API keys
