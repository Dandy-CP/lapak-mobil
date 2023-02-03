import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import SpeedIcon from "@mui/icons-material/Speed";

import { Get_Image } from "../../utils/APIendpoints";

const ListCar = ({ listCarData }) => {
  return (
    <Box>
      {listCarData.map((item) => (
        <Card
          key={item.CarInfoID}
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
            image={`${Get_Image + item.ImageFilename}`}
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
              <strong>
                {item.BrandName} {item.CarVariant} {item.CarType}
              </strong>
            </Typography>

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
              gutterBottom
            >
              <EventIcon sx={{ marginRight: "5px" }} /> {item.YearMade}
              <SpeedIcon sx={{ marginRight: "5px", marginLeft: "10px" }} />
              {item.CarSpeedometer}
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
              Rp.{item.SellCashPrice}
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

export default ListCar;
