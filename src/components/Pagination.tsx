import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { Data } from "../types/Response";

type Props = {
  data: Data | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

export const Pagination: React.FC<Props> = ({
  data,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  isLoading,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={data!.count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "36px",
      }}
    />
  );
};
