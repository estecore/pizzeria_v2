import React from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";

export function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [sortAscDesc, setSortAscDesc] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65bd679cb51f9b29e93367d0.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProperty}&order=${sortAscDesc ? "asc" : "desc"}`
    ).then((res) => {
      res.json().then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortAscDesc]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={(id) => setCategoryId(id)}
        />
        <Sort
          sortAscDesc={sortAscDesc}
          setSortAscDesc={(i) => setSortAscDesc(i)}
          selected={sortType}
          setSelected={(obj) => setSortType(obj)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj, index) => (
              <PizzaBlock key={obj.id + index} {...obj} />
            ))}
      </div>
    </div>
  );
}
