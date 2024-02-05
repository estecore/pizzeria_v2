import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

export function Home({ searchValue }) {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortAscDesc, setSortAscDesc] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://65bd679cb51f9b29e93367d0.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.sortProperty}&order=${sortAscDesc ? "asc" : "desc"}${
          searchValue ? `&search=${searchValue}` : ""
        }`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, sortAscDesc, searchValue, currentPage]);

  const arrSkeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const arrPizzas = pizzas.map((obj, index) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={onChangeCategory}
        />
        <Sort
          sortAscDesc={sortAscDesc}
          setSortAscDesc={(i) => setSortAscDesc(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? arrSkeletons : arrPizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
