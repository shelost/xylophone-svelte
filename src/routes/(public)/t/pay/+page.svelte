<script>
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';

    // Stripe connection status store
    let isStripeConnected = writable(false);

    // Stripe payment status store
    let isPaid = writable(false);

    // Stripe Payment Intent
    let paymentIntent;

    // Function to handle Stripe connection
    async function connectToStripe() {
      // Replace 'YOUR_STRIPE_CONNECT_URL' with the actual URL to connect Stripe
      const connectUrl = 'YOUR_STRIPE_CONNECT_URL';

      // Open the Stripe Connect page in a new window
      window.open(connectUrl, '_blank');
    }

    // Function to handle form submission
    async function handleSubmit() {
      const amount = +$amount;
      const note = $note;

      // Replace 'YOUR_STRIPE_PAYMENT_INTENT_URL' with the actual URL to create a payment intent
      const paymentIntentUrl = 'YOUR_STRIPE_PAYMENT_INTENT_URL';

      try {
        const response = await fetch(paymentIntentUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, note }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const { client_secret } = await response.json();

        // Initialize Stripe with your publishable key
        const stripe = Stripe('pk_live_51N5gB1EMsqVSwv70Khc3qDJ1AGzEuEnpmWRtQ0CF10L3ia4Vjw9njVvvMrEViJvaR20IXUuRAS3qTE0yLPbxDRem00MBNvL33e');

        // Create a PaymentIntent
        paymentIntent = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement('card'),
            billing_details: {
              name: 'Cardholder Name',
            },
          },
        });

        if (paymentIntent.error) {
          throw new Error(paymentIntent.error.message);
        }

        // Set isPaid to true if the payment was successful
        if (paymentIntent.paymentIntent.status === 'succeeded') {
          isPaid.set(true);
        }
      } catch (error) {
        console.error('Error processing payment:', error.message);
      }
    }

    // Initialize Stripe elements
    let elements;
    onMount(() => {
      // Load Stripe.js asynchronously
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        const stripe = Stripe('pk_live_51N5gB1EMsqVSwv70Khc3qDJ1AGzEuEnpmWRtQ0CF10L3ia4Vjw9njVvvMrEViJvaR20IXUuRAS3qTE0yLPbxDRem00MBNvL33e');
        elements = stripe.elements();
      };
      document.body.appendChild(script);
    });

    // Clean up Stripe elements on component destruction
    onDestroy(() => {
      if (elements) {
        elements.getElement('card').destroy();
      }
    });

    // Function to format currency amount
    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    }
  </script>

  {#if !$isStripeConnected}
    <button on:click={connectToStripe}>Connect Stripe</button>
  {:else}
    {#if !$isPaid}
      <form on:submit|preventDefault={handleSubmit}>
        <label>
          Amount:
          <input type="number" bind:value={$amount} required />
        </label>
        <label>
          Note:
          <input type="text" bind:value={$note} required />
        </label>
        <div id="card-element" />
        <button type="submit">Submit</button>
      </form>
    {:else}
      <p>This invoice has already been paid.</p>
    {/if}
  {/if}

  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }

    #card-element {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background-color: #0070f3;
      color: #fff;
      cursor: pointer;
    }

    p {
      font-size: 16px;
      color: green;
    }
  </style>
