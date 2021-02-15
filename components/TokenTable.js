import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Link from "next/Link";
import { useRouter } from "next/router";
import Image from "next/image";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import toFixed from "../util/toFixed";

import useAsync from "../util/hooks/useAsync";
import axios from "../util/axios";
const columns = [
  // { id: "watchlist", minWidth: 10 },
  { id: "number", label: "#", minWidth: 10, sort: true },
  { id: "image", label: "", minWidth: 65 },
  { id: "symbol", label: "Name", minWidth: 100 },
  // { id: "contractAddress", label: "Contract Address", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 80, sort: true },
  {
    id: "marketCap",
    label: "Market Cap",
    minWidth: 100,
    tooltip: {
      data: "random data",
      link: "some raandome link",
    },
    sort: true,
  },
  {
    id: "volume",
    label: "Volume",
    minWidth: 150,
    tooltip: {
      data: "random vol data",
      link: "some vol link",
    },
    sort: true,
  },
  {
    id: "circulationSupply",
    label: "Circulation Supply",
    minWidth: 250,
    tooltip: {
      data: "random ciculting supply data",
      link: "some cs link",
    },
    sort: true,
  },
  {
    id: "maxSupply",
    label: "Max Supply",
    minWidth: 170,
    tooltip: {
      data: "random max supply data",
      link: "some cs link",
    },
    sort: true,
  },
  // {
  //   id: "options",
  //   minWidth: 5,
  // },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  tCell: {
    color: theme.palette.primary.main,
  },
  menuPaper: {
    boxShadow: theme.shadows[1],
    // boxShadow: "0.15px 0.15px #888888",
  },
  container: {
    // minWidth: "400px",
    // maxHeight: 440,
  },
  pointer: {
    cursor: "pointer",
  },
  tooltip: {
    padding: "10px 15px",
    minWidth: "130px",
    color: "#555555",
    lineHeight: "1.7em",
    background: "#FFFFFF",
    border: "none",
    borderRadius: "3px",
    boxShadow:
      "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    maxWidth: "200px",
    textAlign: "center",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "0.875em",
    fontStyle: "normal",
    fontWeight: "400",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto",
  },
}));

export default function TokenTable({ socket, tokens }) {
  const router = useRouter();

  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  // const {
  //   execute: getTokens,
  //   status,
  //   value: tokensData,
  //   error,
  //   setValue: setTokensData,
  // } = useAsync(() => axios.get("/tokens"), false);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("marketCap");

  const [rows, setRows] = useState(tokens);

  useEffect(() => {
    console.log("token table", tokens);
    setRows(tokens);
  }, [tokens]);
  // useEffect(() => {
  //   getTokens();
  // }, []);

  // useEffect(() => {
  //   console.log("setting", status);
  //   if (status === "success") {
  //     setRows(tokensData.data);
  //     console.log(tokensData.data);
  //   }
  // }, [status]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableSortLabel /> */}
              {columns.map((column, i) => (
                <TableCell
                  style={{ color: theme.palette.primary }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {/* {console.log(column.id)} */}
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={generateSort(column.id)}
                    >
                      {column.label}{" "}
                    </TableSortLabel>
                  ) : (
                    <> {column.label} </>
                  )}
                  {column.tooltip && (
                    <Tooltip
                      interactive
                      // classes={{ tooltip: classes.tooltip }}
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
                            {
                              column.tooltip.link //!wrap
                            }
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
                    {/* {console.log(row._id)} */}
                    {columns.map((column, i) => {
                      let value = row[column.id];
                      // if (column.id === "price") value = row.info.base.price;
                      // console.log(column.id);
                      // console.log(row["info.base.price"]);
                      if (value === undefined) return null;
                      // if (
                      //   // column.id === "marketCap" ||
                      //   column.id === "circulationSupply"
                      // ) {
                      //   value = toFixed(value);
                      // }
                      //! fix
                      if (column.id === "price")
                        if (value > 1)
                          value =
                            Math.round((value + Number.EPSILON) * 100) / 100;
                        else
                          value =
                            Math.round((value + Number.EPSILON) * 1000000) /
                            1000000;
                      if (column.id === "number") value = index + 1;

                      if (column.id === "marketCap") {
                        value = row["price"] * row["circulationSupply"];
                        value = Math.round(toFixed(value));
                      }

                      // console.log(`/uploads/${row.image}`);
                      return (
                        <TableCell
                          key={`${column.id}-${row._id}`}
                          align={column.align}
                          className={
                            column.id === "symbol" ? classes.pointer : ""
                          }
                          onClick={() => {
                            if (column.id === "symbol")
                              router.push(`/token/${row._id}`);
                          }}
                        >
                          {column.id === "image" ? (
                            <Image
                              onClick={() => {
                                // if (column.id === "symbol")
                                router.push(`/token/${row._id}`);
                              }}
                              src={`/uploads/${row.image}`}
                              // style={{ cursor: "pointer" }}
                              className={classes.pointer}
                              alt="coin"
                              layout="intrinsic"
                              width={100}
                              height={100}
                            />
                          ) : (
                            <>{value}</>
                          )}
                        </TableCell>
                        // </>
                      );
                    })}
                    {/* </Link> */}
                    {/* <TableCell align="left">
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        // keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        classes={{ paper: classes.menuPaper }}
                      >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                          My account
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                      </Menu>
                     
                    </TableCell> */}
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

// export async function getServerSideProps(context) {
//   console.log(context.socket);
//   try {
//     const { data } = await axios.get(`/tokens/`);
//     return {
//       props: { tokens: data }, // will be passed to the page component as props
//     };
//   } catch (err) {
//     console.log(err);
//     return { props: {} };
//   }
// }
