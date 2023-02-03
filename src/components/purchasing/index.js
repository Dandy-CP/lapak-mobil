import React, { useEffect, useState } from "react";
import axios from "axios";
import { Storage } from "@capacitor/storage";
import { navigate } from "gatsby";

import { Purchase_invoice, Get_Image } from "../../utils/APIendpoints";
import ListInvoiceCar from "./listInvoiceCar";
import ListInvoicePartner from "./listInvoicePartner";
import Sidebar from "../sidebar";
import Loader from "../loader";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Index = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
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
  const [value, setValue] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [partnerInvoices, setPartnerInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true);
      Storage.get({ key: "user" }).then(
        (user) => {
          console.log(user);
          if (user.value) {
            user = JSON.parse(user.value);
            setSession(user);
            getInvoices(user, 0);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [props.reloadList]);

  const getInvoices = (user, isPartner) => {
    setLoading(true);

    axios
      .get(Purchase_invoice + isPartner + "/0/0/20", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then(function (response) {
        if (response && response.data) {
          if (isPartner) {
            setPartnerInvoices(response.data);
          } else {
            setInvoices(response.data);
          }
        } else {
          if (isPartner) {
            setPartnerInvoices([]);
          } else {
            setInvoices([]);
          }
        }
        setLoading(false);
      })
      .catch(function (error) {
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

  const handleTabChange = (e, newTabValue) => {
    setValue(newTabValue);
    if (newTabValue === 1 && partnerInvoices.length === 0) {
      getInvoices(session, 1);
    }
  };

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
            sx={{ color: "#fff" }}
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

        <Tabs
          value={value}
          sx={{ margin: "0 30px" }}
          onChange={handleTabChange}
        >
          <Tab
            label="Pembelian Mobil"
            sx={{ color: "#fff", textTransform: "none" }}
          />

          <Tab
            label="Mobil Rekanan"
            sx={{ color: "#fff", textTransform: "none" }}
          />
        </Tabs>
      </Box>

      <br />

      <ListInvoiceCar invoices={invoices} value={value} />
      <ListInvoicePartner partnerInvoices={partnerInvoices} value={value} />

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
