import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const DrawerPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{ width: "auto", height: "350px", padding: "20px" }}
      role="presentation"
    >
      <Typography variant="p" sx={{ fontWeight: "bold", color: "#14A1A1" }}>
        Ganti Password
      </Typography>

      <FormControl sx={{ marginBottom: "10px" }} variant="standard" fullWidth>
        <InputLabel htmlFor="Password-lama">Password Lama</InputLabel>
        <Input
          id="Password-lama"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ marginBottom: "10px" }} variant="standard" fullWidth>
        <InputLabel htmlFor="Password-baru">Password Baru</InputLabel>
        <Input
          id="Password-baru"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ marginBottom: "10px" }} variant="standard" fullWidth>
        <InputLabel htmlFor="Konfirmasi-pass-baru">
          Konfirmasi Password Baru
        </InputLabel>
        <Input
          id="Konfirmasi-pass-baru"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: "50px",
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default DrawerPassword;
