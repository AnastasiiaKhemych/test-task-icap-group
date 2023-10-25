import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useLoginMutation } from "../services/api.service";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

type FormTypes = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [login, { isError, data }] = useLoginMutation();
  const { handleSubmit, control } = useForm<FormTypes>({
    resolver: yupResolver(
      object({
        username: string().min(1).max(150).required(`Username is required`),
        password: string().min(1).max(128).required(`Password is required`),
      }),
    ),
  });

  const handlePostsSubmit = (data: any) => {
    login(data);
  };

  useEffect(() => {
    if (isError === true) {
      enqueueSnackbar("Invalid credentials", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else if (isError === false && data !== undefined) {
      enqueueSnackbar("Successful login", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      navigate("/table");
    }
  }, [isError, data]);

  return (
    <>
      <Container maxWidth="xs" sx={{ marginBlock: "120px" }}>
        <Typography variant="h3" color="primary" sx={{ marginBottom: "16px" }}>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handlePostsSubmit)}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error?.message}
                helperText={error?.message}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={value}
                onChange={onChange}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error?.message}
                helperText={error?.message}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={value}
                onChange={onChange}
                required
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: "30px" }}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    </>
  );
};
