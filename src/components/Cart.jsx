import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
    );

    const handleCloseCart = () => {
        userProgressCtx.hideCart();
    };

    const handleGoToCheckout = () => {
        userProgressCtx.showCheckout();
    };
    return (
        <Modal
            className='cart'
            open={userProgressCtx.process === "cart"}
            onClose={
                userProgressCtx.process === "cart" ? handleCloseCart : null
            }
        >
            <h2>Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGoToCheckout}>To checkout</Button>
                )}
            </p>
        </Modal>
    );
};

export default Cart;
