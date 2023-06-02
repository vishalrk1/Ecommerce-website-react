import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStrip = price * 100;
    const publishableKey = 'pk_test_51NEQyPSHL82qPmOKaXZf1NXAoihguzpIWtl3ZgcMuh3nPeaUKqHa82Pjj83d70wY3qisUjynwuzbG1onDfGVc2vv00hC2cNPar';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    };
    
    return(
        <StripeCheckout currency="USD" 
            stripeKey={publishableKey}
            label="Pay Now"
            name="GET IT"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStrip}
            panelLabel="Pay Now"
            token={onToken}
        />
    );
};

export default StripeCheckoutButton;

