import { useEffect, useState } from "react";
import MenuItem from "../components/MenuItem/MenuItem.jsx";

import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";

const RestaurantView = () => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => (res.ok ? res.json() : { meals: [] }))
      .then((data) => setDishes(data.meals ?? []))
      .catch(() => setDishes([]));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    let isActive = true;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
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
  }, [searchTerm]);

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>
        <SearchField onSearch={setSearchTerm} />
      </NavBar>

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
