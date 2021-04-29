import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  TableSortLabel,
  Typography,
} from "@material-ui/core";

import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import UnitContext from "../../util/context/UnitContext";

import useStyles from "./style";

import columns from "./config";

export default function TokenTable({ tokens }) {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("marketCap");
  const [rows, setRows] = useState(tokens);
  const { unit } = useContext(UnitContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setRows(tokens);
  }, [tokens]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function stableSort(array, comparator) {
    console.log("array");
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
    let valA, valB;
    if (orderBy === "marketCap") {
      valA = a["price"] * a["circulationSupply"];
      valB = b["price"] * b["circulationSupply"];
    } else {
      valB = b[orderBy];
      valA = a[orderBy];
    }
    if (valB < valA) return -1;
    if (valB > valA) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  style={{ color: theme.palette.primary }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={generateSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    <> {column.label} </>
                  )}
                  {column.tooltip && (
                    <Tooltip
                      interactive
                      arrow
                      title={
                        <>
                          <Typography color="inherit" varint="h5">
                            {column.label}
                          </Typography>
                          <Typography color="inherit" variant="body2">
                            {column.tooltip.data}
                          </Typography>
                          <Typography color="inherit" variant="body1">
                            {column.tooltip.link}
                          </Typography>
                        </>
                      }
                    >
                      <InfoRoundedIcon
                        style={{ color: "grey" }}
                        fontSize="small"
                      />
                    </Tooltip>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover key={row._id}>
                    {columns.map((column, i) => {
                      const value = column.extractValue
                        ? column?.extractValue({ row, unit, index })
                        : row[column.id];
                      return (
                        <TableCell
                          key={`${column.id}-${row._id}`}
                          align={column.align}
                          className={
                            column?.className
                              ? classes[column.className]
                              : "table-cell"
                          }
                          onClick={() => {
                            if (column.id === "symbol" || column.id === "name")
                              router.push(`/token/${row._id}`);
                          }}
                        >
                          {column.id === "image" ? (
                            <img
                              onClick={() => {
                                router.push(`/token/${row._id}`);
                              }}
                              src={row.image}
                              className={classes.image}
                              alt="coin"
                            />
                          ) : (
                            <>{value}</>
                          )}
                        </TableCell>
                        // </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
