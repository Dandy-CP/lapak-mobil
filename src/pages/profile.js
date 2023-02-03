import React, { Fragment, useEffect, useState } from "react";
import { App } from "@capacitor/app";

import Auth from "../components/auth";
import Profile from "../components/profile/index";
import { theme } from "../components/theme";

import { Dialog } from "@capacitor/dialog";
import { ThemeProvider } from "@mui/material/styles";
import "/src/styles/global.css";

const ProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState("profile");
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    App.addListener("backButton", (data) => {
      Dialog.confirm({
        title: "Confirm",
        message: "Apakah anda ingin keluar?",
      }).then((response) => {
        if (response && response.value) {
          App.exitApp();
        }
      });
    });
    setReloadList(true);
  }, []);

  return (
    <Fragment>
      <Auth />
      <ThemeProvider theme={theme}>
        {activeComponent == "profile" && <Profile reloadList={reloadList} />}
      </ThemeProvider>
    </Fragment>
  );
};

export default ProfilePage;
