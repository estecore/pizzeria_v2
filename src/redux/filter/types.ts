export type Sort = {
  name: string;
  sortProperty: "rating" | "price" | "alphabet";
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
}
