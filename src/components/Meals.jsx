import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};
const Meals = () => {
    const {
        data: loadMeals,
        isLoading,
        error,
    } = useHttp("http://localhost:3000/meals", requestConfig, []);
    if (isLoading) return <p className='center'>Loading...</p>;
    if (error) return <Error title='Fail to fetch meals' message={error} />;
    // if (!data) return <p>No meals</p>;
    return (
        <ul id='meals'>
            {loadMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
};

export default Meals;
