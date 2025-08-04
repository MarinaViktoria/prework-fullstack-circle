import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./MenuItem.module.css";

import { useCart } from "../../context/useCart";

const MenuItem = ({ dish }) => {
  const { addToCart } = useCart();

  const { strMeal: name, strMealThumb: image } = dish;
  const navigate = useNavigate();
  return (
    <div className={styles.menuItem}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p className="mt-2 font-semibold">Price: 8.99 €</p> {/*dummy-price*/}
      <div className={styles.menuItemBtnContainer}>
        <Button onClick={() => navigate(`/meals/${dish.idMeal}`)}>
          Details
        </Button>
      </div>
      <Button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() =>
          addToCart({
            id: dish.idMeal,
            title: dish.strMeal,
            price: 8.99,
          })
        }
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default MenuItem;
