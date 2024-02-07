import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
