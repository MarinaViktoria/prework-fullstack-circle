import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import MenuItem from "../components/MenuItem/MenuItem.jsx";

import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";
import Cart from "../components/Cart.jsx";
import { useCart } from "../context/useCart";

const RestaurantView = () => {
  const { cart } = useCart();
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // wait 500ms
  const [isCartVisible, setIsCartVisible] = useState(false);

  // all dishes at firs mount
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => (res.ok ? res.json() : { meals: [] }))
      .then((data) => setDishes(data.meals ?? []))
      .catch(() => setDishes([]));
  }, []);

  // search debounced value after every change
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") return;

    let isActive = true;

    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchTerm}`
    )
      .then((res) => (res.ok ? res.json() : { meals: null }))
      .then((result) => {
        if (!isActive) return;
        setDishes(result.meals ?? []);
      })
      .catch(() => {
        if (!isActive) return;
        setDishes([]);
      });

    return () => {
      isActive = false;
    };
  }, [debouncedSearchTerm]);

  const toggleCart = () => {
    setIsCartVisible((prev) => !prev);
  };

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>
        <SearchField onSearch={setSearchTerm} />

        <div className="relative">
          <button
            onClick={toggleCart}
            className="bg-sky-500 py-1 px-3 rounded hover:bg-sky-600 transition-all duration-300 ease-in-out"
          >
            {isCartVisible ? "Close Cart" : "View Cart"}
          </button>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </NavBar>

      {isCartVisible && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[35%] bg-white shadow-lg z-50 p-6 overflow-y-auto transition-all duration-300 ease-in-out">
          <Cart />
          <div className="flex justify-center w-full">
            <button
              onClick={toggleCart}
              className="mt-8 bg-sky-500 text-white py-1 px-2 rounded hover:bg-sky-600 transition-all duration-300 ease-in-out"
            >
              Close Cart
            </button>
          </div>
        </div>
      )}

      <div className={styles.restaurantWrapper}>
        <div className={styles.menu}>
          {dishes.length > 0 ? (
            dishes.map((dish) => <MenuItem dish={dish} key={dish.idMeal} />)
          ) : (
            <p>No dishes found :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantView;
