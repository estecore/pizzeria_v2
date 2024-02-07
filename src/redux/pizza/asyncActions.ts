import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchPizzasArgs, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentPage, categoryId, sortAscDesc, searchValue, sortProperty } =
      params;
    const { data } = await axios.get<Pizza[]>(
      `https://65bd679cb51f9b29e93367d0.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortProperty}&order=${sortAscDesc ? "asc" : "desc"}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );
    return data;
  }
);
