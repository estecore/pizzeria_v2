import React from "react";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { Categories } from "../components/Categories";
import { Sort, list } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

export function Home({ searchValue }) {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortAscDesc, setSortAscDesc] = React.useState(true);

  // axios get pizzas from backend
  const fetchPizzas = () => {
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
  };

  // if was the first render, check the URL-parameters and save it in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // if was the first render and changed parametrs, need to add URL-parameters
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, sortAscDesc, searchValue, currentPage]);

  // if was the first render, get pizzas
  React.useEffect(() => {
    if (isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, sortAscDesc, searchValue, currentPage]);

  const arrSkeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const arrPizzas = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
