import React, { useEffect, useState } from "react";
import axios from "axios";
import { Storage } from "@capacitor/storage";
import { navigate } from "gatsby";

import { Car_info, Get_Image } from "../../utils/APIendpoints";
import ListCar from "./listCar";
import Sidebar from "../sidebar";
import Loader from "../loader";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

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
  const [listCarSales, setListCarSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const getListCar = (user) => {
    setLoading(true);

    axios
      .get(Car_info, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setListCarSales(res.data);
        setLoading(false);
      })
      .catch((error) => {
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
      });
  };

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true);
      Storage.get({ key: "user" }).then(
        (user) => {
          if (user.value) {
            user = JSON.parse(user.value);
            setSession(user);
            getListCar(user, 0);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [props.reloadList]);

  const hideSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <Box className="index">
      <Box
        sx={{
          backgroundColor: "#132f61",
          color: "#fff",
          borderRadius: "0 0 15px 15px",
        }}
      >
        <Card
          sx={{
            backgroundColor: "#132f61",
            color: "#fff",
            padding: "10px",
            boxShadow: "none",
          }}
        >
          <CardHeader
            sx={{ color: "#fff", cursor: "pointer" }}
            avatar={<Avatar src={Get_Image + session.employee_img} />}
            title={"Hi, " + session.employee_name}
            subheader={session.position_name}
            onClick={() => {
              navigate("/profile");
            }}
          />

          <CardContent sx={{ paddingBottom: "0 !important" }}>
            <TextField
              fullWidth
              className="search"
              variant="outlined"
              size="small"
              placeholder="Cari Mobil..."
              sx={{
                backgroundColor: "#586c90",
                color: "#fff",
                borderRadius: "25px",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>

        <Tabs value={0} sx={{ margin: "0 30px" }}>
          <Tab
            label="Listing Mobil"
            sx={{ color: "#fff", textTransform: "none" }}
          />
        </Tabs>
      </Box>

      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", fontSize: "20px", margin: "15px 30px" }}
      >
        Produk Terbaru
      </Typography>

      <ListCar listCarData={listCarSales} />

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: "25px", right: "25px" }}
      >
        <DirectionsCarIcon />
      </Fab>

      <Sidebar showSidebar={showSidebar} hideSidebar={() => hideSidebar()} />

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
