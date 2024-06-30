import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import { useEffect } from "react";

// import { useState } from "react";

import PropTypes from "prop-types";


// const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
const CLIENT_ID ="ASZ121E_b7BV-FRFFrDKZPGC15TDw5AWzlpvqeb4JZ4jDHm931XOrE7i7UDSkpn8u1MmGWutWemcMx8Y";
// const CLIENT_ID = "test"

console.log(CLIENT_ID);

// This value is from the props in the UI
const style = {"layout":"vertical"};

export default function PayPalPayment({handleCheckOut, checkInput, amount}) {
    // const [loading, setLoading] = useState(false);

    
    // async function onApprove(data) {
    //     // replace this url with your server
    //     return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             orderID: data.orderID,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((orderData) => {
    //             // Your code here after capture the order
    //             console.log("Capture result", orderData);
    //             if(orderData.status === "COMPLETED"){
    //                 handleCheckOut();
    //                 console.log("Thanh toán thành công")
    //             } else {
    //                 console.log("Thanh toán thất bại")
    //             }
    //         });
    // }
    
    // Custom component to wrap the PayPalButtons and show loading spinner
    const ButtonWrapper = ({ currency, showSpinner, amount }) => {
        const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
        
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency,
                    // "disable-funding": "card",
                    clientId: CLIENT_ID,
                },
            });
        },[currency, showSpinner])

        return (
            <>
                { (showSpinner && isPending) && <div className="spinner">Loadding...</div> }
                <PayPalButtons
                    onClick={checkInput}
                    style={style}
                    disabled={false}
                    forceReRender={[style, currency, amount]}
                    fundingSource={undefined}
                    createOrder={ async (data, actions) => {
                        return await actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        }).then((orderID) => {
                            console.log("orderID: ", orderID);
                            return orderID;
                        });
                    }}
                    onApprove={
                        async (data, actions) => {
                            return await actions.order.capture().then((details) => {
                                console.log("details: ", details);
                                if(details.status === "COMPLETED"){
                                    handleCheckOut();
                                    console.log("Thanh toán thành công")
                                } else {
                                    console.log("Thanh toán thất bại")
                                }
                            });
                        }
                    }
                />
            </>
        );
    }
    ButtonWrapper.propTypes = {
        showSpinner: PropTypes.bool.isRequired,
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
    };

    return (
        <div className="paypalPayment">
            <PayPalScriptProvider options={{ clientId: CLIENT_ID, components: "buttons", currency: "USD" }}>
                <ButtonWrapper showSpinner={false} currency="USD" amount={amount}/>
            </PayPalScriptProvider>
        </div>
    );
    
}

PayPalPayment.propTypes = {
    handleCheckOut: PropTypes.func.isRequired,
    checkInput: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
};