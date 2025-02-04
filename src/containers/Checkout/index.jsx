import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import stripePromise from '../../Config/stripeConfig';
import { CheckoutForm } from '../../components';

export function Checkout() {
  const {
    state: { clientSecret },
  } = useLocation();

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
