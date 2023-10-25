import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { useGetInfoQuery } from "../services/api.service";
import { Modal } from "../components/Modal";
import { Post } from "../types/Response";
import { useState } from "react";
import { Pagination } from "../components/Pagination";

export const TablePage = () => {
  const [postToUpdate, setPostToUpdate] = useState<Post | null>(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isLoading } = useGetInfoQuery({
    limit: rowsPerPage,
    page,
  });

  const handleClose = () => {
    setOpen(false);
    setPostToUpdate(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ margin: "100px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Birthday</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone number</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data!.results.map((res) => (
              <TableRow
                key={res.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {res.name}
                </TableCell>
                <TableCell align="right">{res.birthday_date}</TableCell>
                <TableCell align="right">{res.email}</TableCell>
                <TableCell align="right">{res.phone_number}</TableCell>
                <TableCell align="right">{res.address}</TableCell>
                <TableCell style={{ width: 40 }} align="right">
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                      setPostToUpdate(res);
                    }}
                    aria-label="update"
                    color="primary"
                    sx={{
                      backgroundColor: "#1876D1",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1768AA",
                      },
                    }}
                  >
                    <CreateIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal postToUpdate={postToUpdate} open={open} onClose={handleClose} />
      <Pagination
        data={data}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        isLoading={isLoading}
      />
    </div>
  );
};
