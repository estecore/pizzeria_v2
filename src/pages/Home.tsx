import React from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId } from "../redux/filter/slice";
import { selectPizzaData } from "../redux/pizza/selectors";

import { Categories } from "../components/Categories";
import { SortPopUp } from "../components/SortPopUp";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { fetchPizzas } from "../redux/pizza/asyncActions";

export const Home: React.FC<{ searchValue: string }> = ({ searchValue }) => {
  const dispatch = useAppDispatch();

  const { categoryId, sort } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortAscDesc, setSortAscDesc] = React.useState(true);

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        categoryId,
        sortAscDesc,
        searchValue,
        sortProperty: sort.sortProperty,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, sortAscDesc, searchValue, currentPage]);

  const arrSkeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const arrPizzas = items.map((obj: any) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={onChangeCategory}
        />
        <SortPopUp
          sortAscDesc={sortAscDesc}
          setSortAscDesc={(i: boolean) => setSortAscDesc(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка..</h2>
          <p>К сожалению, не удалось получить питсы 😭😭😭</p>
          <p>Попробуйте повторить попытку позже..</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? arrSkeletons : arrPizzas}
        </div>
      )}

      <Pagination onChangePage={(page: number) => setCurrentPage(page)} />
    </div>
  );
};
