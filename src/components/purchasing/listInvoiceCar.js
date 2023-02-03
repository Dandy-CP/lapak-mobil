import React from "react";

import { Get_Image } from "../../utils/APIendpoints";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import logo from "../../images/logo.png";

const ListInvoiceCar = ({ invoices, value }) => {
  return (
    <Box sx={{ display: value === 0 ? "block" : "none" }}>
      {invoices.map((item) => (
        <Card
          key={item.InvoiceID}
          sx={{
            display: "flex",
            flexDirection: "row",
            boxShadow: "3",
            width: "95%",
            borderRadius: "0px 10px 10px 0px",
            marginBottom: "10px",
          }}
        >
          <CardMedia
            component="img"
            image={!item.DirImage ? logo : `${Get_Image + item.DirImage}`}
            alt={`${item.BrandName + item.CarVariant + item.CarType}`}
            sx={{
              width: "30%",
              height: "180px",
              objectFit: "contain",
              backgroundColor: item.DirImage ? "#fff" : "#132f61",
            }}
          />

          <CardContent sx={{ width: "65%" }}>
            <Typography variant="body2" gutterBottom>
              {item.InvoiceDate}
              <br />
              <strong>
                {item.BrandName} {item.CarVariant} {item.CarType}
              </strong>
              <br />
              {item.CarCode} {item.CarNo}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <strong>Beli | Rp. {item.PurchasePrice}</strong>
              <br />
              DP Pembelian | Rp. {item.DPNominal}
              <br />
            </Typography>

            <br />

            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "25px",
                fontWeight: "bold",
                float: "right",
              }}
            >
              DP Pembelian
            </Button>
          </CardContent>
        </Card>
      ))}
      <br />
      <br />
      <br />
    </Box>
  );
};

export default ListInvoiceCar;
