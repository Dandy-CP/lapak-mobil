import React, { useEffect, useState } from "react";
import { Storage } from "@capacitor/storage";
import { navigate } from "gatsby";

import { Get_Image } from "../../utils/APIendpoints";
import DrawerPassword from "./drawer";
import Loader from "../loader";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Index = (props) => {
  const [session, setSession] = useState({
    expired_at: 0,
    employee_code: "",
    employee_name: "",
    position_name: "",
    status: 1,
    token: "",
    username: "",
    employee_img: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [drawerToggle, setDrawerToggle] = useState(false);

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true);

      Storage.get({ key: "user" }).then(
        (user) => {
          console.log(user);
          if (user.value) {
            user = JSON.parse(user.value);
            setSession(user);
            setLoading(false);
          }
        },
        (error) => {
          console.log(error);

          let message =
            "TERJADI KESALAHAN PADA SISTEM. MOHON COBA BEBERAPA SAAT LAGI";

          if (error && error.response && error.response.data) {
            console.log(error.response.data);
            if (error.response.data.message) {
              message = error.response.data.message;
            }
          }

          setLoading(false);
          setAlert(true);
          setAlertMessage(message);

          if (error.response.status === 401) {
            setTimeout(function () {
              Storage.remove({ key: "user" }).then(
                (user) => {
                  navigate("/login");
                },
                (error) => {
                  console.log(error);
                }
              );
            }, 2000);
          }
        }
      );
    }
  }, [props.reloadList]);

  const handleLogOut = () => {
    Storage.remove({ key: "user" }).then(
      (user) => {
        navigate("/login");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Box className="index">
      <Card
        sx={{
          backgroundColor: "#132f61",
          color: "#fff",
          borderRadius: "0 0 15px 15px",
          position: "absolute",
          top: "0",
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "600",
            fontSize: "18px",
            margin: "15px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIosIcon
            sx={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          />
          User Profile
          <LogoutIcon
            sx={{
              position: "absolute",
              right: "0",
              marginRight: "25px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleLogOut();
            }}
          />
        </Typography>
      </Card>

      <Card
        sx={{
          backgroundColor: "#B8C4DB",
          color: "#fff",
          zIndex: "-1",
          width: "100%",
          height: "250px",
        }}
      >
        <CardContent
          sx={{
            color: "black",
            paddingBottom: "0 !important",
            paddingTop: "100px",
            marginLeft: "10px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={Get_Image + session.employee_img}
              alt="User Avatar"
              sx={{ width: "100px", height: "100px", marginRight: "20px" }}
            />

            <Box>
              <Typography
                variant="p"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <PersonIcon sx={{ marginRight: "10px" }} />
                {session.employee_name}
              </Typography>

              <Typography
                variant="p"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CallIcon sx={{ marginRight: "10px" }} /> 000000000
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box
        component="form"
        sx={{
          padding: "30px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nama"
          variant="standard"
          sx={{ marginBottom: "15px" }}
          value={session.employee_name}
          fullWidth
        />

        <TextField
          label="Jabatan"
          variant="standard"
          sx={{ marginBottom: "15px" }}
          value={session.position_name}
          fullWidth
        />

        <TextField
          label="Nomor Handphone"
          variant="standard"
          sx={{ marginBottom: "15px" }}
          defaultValue="000000000"
          fullWidth
        />

        <TextField
          label="Alamat"
          variant="standard"
          sx={{ marginBottom: "15px" }}
          fullWidth
        />

        <TextField
          label="Password"
          variant="standard"
          type="password"
          sx={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon
                  sx={{ position: "absolute", right: "0" }}
                  onClick={() => {
                    setDrawerToggle(true);
                  }}
                />
              </InputAdornment>
            ),
          }}
          defaultValue="12345678"
          fullWidth
        />

        <TextField
          label="Kode"
          variant="standard"
          sx={{ marginBottom: "15px" }}
          value={session.employee_code}
          fullWidth
        />
      </Box>

      <Drawer
        anchor="bottom"
        open={drawerToggle}
        onClose={() => {
          setDrawerToggle(false);
        }}
      >
        <DrawerPassword />
      </Drawer>

      <Loader open={loading} />

      <Snackbar
        open={alert}
        message={alertMessage}
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={() => setAlert(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Index;
