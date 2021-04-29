const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
const onRequestSort = (e, col_id) => {
  const isAsc = orderBy === col_id && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(col_id);
};
const generateSort = (col_id) => (e) => {
  onRequestSort(e, col_id);
};
function descendingComparator(a, b, orderBy) {
  if (orderBy === "marketCap") {
    if (
      b["price"] * b["circulationSupply"] <
      a["price"] * a["circulationSupply"]
    ) {
      return -1;
    }
    if (
      b["price"] * b["circulationSupply"] >
      a["price"] * a["circulationSupply"]
    ) {
      return 1;
    }
    return 0; //! fix this
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default {
  getComparator,
  handleChangePage,
  generateSort,
  onRequestSort,
  handleChangeRowsPerPage,
  stableSort,
};
