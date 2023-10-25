import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import { Post } from "../types/Response";
import { useUpdateInfoMutation } from "../services/api.service";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  postToUpdate: Post | null;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  postToUpdate,
}) => {
  const [updateInfo, { isSuccess, isError }] = useUpdateInfoMutation();

  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset, setValue } = useForm<Omit<Post, "id">>({
    values: {
      name: postToUpdate?.name || "",
      email: postToUpdate?.email || "",
      birthday_date: postToUpdate?.birthday_date || "",
      phone_number: postToUpdate?.phone_number || "",
      address: postToUpdate?.address || "",
    },
    mode: "onChange",
    resolver: yupResolver(
      object({
        name: string().required(`Name is required`).max(255),
        email: string()
          .required(`Email is required`)
          .max(254)
          .email("Invalid email"),
        birthday_date: string().required(`Birthday is required`),
        phone_number: string().required(`Phone is required`).max(20),
        address: string(),
      }),
    ),
  });

  const handleUpdateSubmit = (data: any) => {
    data.birthday_date = moment.utc(data.birthday_date).format("YYYY-MM-DD");
    const body = { id: postToUpdate?.id, ...data };

    updateInfo(body);
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(`Post updated successfully`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      onClose();
    }
    if (isError) {
      enqueueSnackbar(`Somthing went wrong`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Post"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(handleUpdateSubmit)}>
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Name"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    "& .MuiInputBase-root": {
                      paddingRight: 0,
                    },
                  }}
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    endAdornment: value && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setValue("name", "")}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="birthday_date"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePicker
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                  format="yyyy-MM-dd"
                  value={new Date(value)}
                  onChange={onChange}
                  sx={{
                    marginTop: "20px",
                  }}
                  label="Birthday"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  type="email"
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Email"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    "& .MuiInputBase-root": {
                      paddingRight: 0,
                    },
                  }}
                  InputProps={{
                    endAdornment: value && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setValue("email", "")}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="phone_number"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Phone number"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    "& .MuiInputBase-root": {
                      paddingRight: 0,
                    },
                  }}
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    endAdornment: value && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setValue("phone_number", "")}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Address"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    "& .MuiInputBase-root": {
                      paddingRight: 0,
                    },
                  }}
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    endAdornment: value && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setValue("address", "")}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            <DialogActions sx={{ paddingRight: "0px", paddingTop: "20px" }}>
              <Button
                onClick={() => {
                  onClose();
                  reset();
                }}
                variant="outlined"
                sx={{
                  color: "#1876D1",
                  border: "1px solid #1876D1",
                  "&:hover": {
                    border: "1px solid #1768AA",
                    color: "#1768AA",
                  },
                }}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                autoFocus
                variant="outlined"
                sx={{
                  color: "white",
                  backgroundColor: "#1876D1",
                  border: "1px solid #1876D1",
                  "&:hover": {
                    border: "1px solid #1768AA",
                    backgroundColor: "#1768AA",
                    color: "white",
                  },
                }}
              >
                SAVE
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
