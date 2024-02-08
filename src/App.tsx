import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";

import "./scss/app.scss";

export const SearchContext = React.createContext({});

const FullPizz: any = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const Cart: any = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const NotFound: any = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

export const App: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home searchValue={searchValue} />} />
            <Route
              path="cart"
              element={
                <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="pizza/:id"
              element={
                <Suspense fallback={<div>Идёт загрузка питсы...</div>}>
                  <FullPizz />
                </Suspense>
              }
            />
            <Route
              path="cart/pizza/:id"
              element={
                <Suspense fallback={<div>Идёт загрузка питсы...</div>}>
                  <FullPizz />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Идёт загрузка...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
};
