import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { toast } from "sonner";
import "../styles/_toastify.css";

const MealItem = ({ meal }) => {
    const cartCtx = useContext(CartContext);
    const handleAddMealToCart = () => {
        cartCtx.addItem(meal);
        toast.success("Meal added to cart!");
    };

    return (
        <li className='meal-item'>
            <article>
                <img
                    src={`https://order-food-q02g.onrender.com/${meal.image}`}
                    alt={meal.name}
                />
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>
                        {currencyFormatter.format(meal.price)}
                    </p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <div className='meal-item-actions'>
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </div>
            </article>
        </li>
    );
};

export default MealItem;
