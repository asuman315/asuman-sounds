import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '../Auth/Alert';
import { Navigation } from '../HorLine';
import { informationActions } from '../../store/infoSlice';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51L5v4dJNPOaQ7OSxTtcorhUjbauQDelTBowOvjmovJhV3wGXG8K3q23WY6VuIvBCXrOA6ZncUgErVZf04dEqQoSy00jeokRBG1'
);

export default function Payment() {
  return (
    <section className='px-4'>
      <h2 className='text-left pt-4 text-xl md:2xl lg:3xl font-bold tracking-wide border-b-2 pb-3'>
        Payment
      </h2>
      <PaymentInfo />
      {/* <BillingAddress /> */}
      <Navigation path='/checkout/shipping' pathName='Return To Shipping' />
    </section>
  );
}

const PaymentInfo = () => {
   const [clientSecret, setClientSecret] = useState('');

   const cartItems = useSelector((state) => state.cart.cartItems);
   const buyItNowItem = useSelector((state) => state.cart.buyItNow);

   useEffect(() => {
     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
     const buyItNowItem = JSON.parse(localStorage.getItem('buyItNowItem'));
     const shippingAddress = JSON.parse(
       localStorage.getItem('shippingAddress')
     );
     const isAddToCartBtnClicked = JSON.parse(localStorage.getItem('isAddToCartBtnClicked'));
     const customerEmail = shippingAddress.email;
    
     const shippingMethod = JSON.parse(localStorage.getItem('shippingMethod'));

     console.log('cartItems', cartItems);

     //get the ids of products
     let idAndQuantity = []
     if(isAddToCartBtnClicked){
       cartItems.map(cartItem => idAndQuantity.push({id: cartItem.id, quantity: cartItem.quantity}))
     } else {
       idAndQuantity= [{id: buyItNowItem.id, quantity: buyItNowItem.quantity}]
     }
        console.log('idAndQuantity', idAndQuantity);
     //https://asuman-sounds-api.herokuapp.com/stripe/payment-intent

     // Create PaymentIntent as soon as the page loads
     fetch('http://localhost:5000/stripe/payment-intent', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         info: { idAndQuantity, email: customerEmail, shippingMethod },
       }),
     })
       .then((res) => res.json())
       .then((data) => setClientSecret(data.clientSecret));
   }, []);  

    const options = {
      // passing the client secret obtained in step 2
      clientSecret,
    };
  return (
    <section>
      <div className='flex items-center justify-center lg:justify-start'>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </section>
  );
};