export type FetchPizzasArgs = {
  currentPage: number;
  categoryId: number;
  sortAscDesc: boolean;
  searchValue: string;
  sortProperty: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
