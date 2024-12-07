import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { toast } from "sonner";
import Error from "./Error";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};
const Checkout = () => {
    const userProgessCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp("https://order-food-q02g.onrender.com/orders", requestConfig, []);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
    );

    const handleClose = () => {
        userProgessCtx.hideCheckout();
    };

    const handleFinish = () => {
        userProgessCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries()); // {email: test@example.com}

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            }),
        );
    };

    let actions = (
        <>
            <Button type='button' onClick={handleClose} textOnly>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );
    if (isSending) {
        actions = <span>Sending order data...</span>;
    }
    if (data && !error) {
        return (
            <Modal
                open={userProgessCtx.process === "checkout"}
                onClose={handleClose}
            >
                <h2>Success!!!</h2>
                <p>Your order was submitted successfully</p>
                <p className='modal-actions'>
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }
    //return
    return (
        <Modal
            open={userProgessCtx.process === "checkout"}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total: {currencyFormatter.format(cartTotal)}</p>

                <Input label='Full Name' text='text' id='name' />
                <Input label='Email' type='email' id='email' />
                <Input label='Address' type='text' id='street' />
                <Input
                    label='Phone'
                    type='tel'
                    id='phone'
                    // pattern='^(0[1-9]{1})\d{8}$'
                    placeholder='+84-123-456'
                />
                <div className='control-row'>
                    <Input label='postal code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>

                {error && <Error title='Fail to send order' message={error} />}
                <p className='modal-actions'>{actions}</p>
            </form>
        </Modal>
    );
};

export default Checkout;
