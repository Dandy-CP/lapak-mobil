import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { Storage } from "@capacitor/storage";

const Auth = () => {
  useEffect(() => {
    Storage.get({ key: "user" }).then(
      (user) => {
        if (!user.value) {
          navigate("/login");
        } else {
          let value = JSON.parse(user.value);

          if (value.expired_at >= new Date().getTime()) {
            navigate("/login");
          } else {
            if (value.position_name === "Salesman") {
              navigate("/sales");
            } else if (value.position_name === "Purchasing") {
              navigate("/purchasing");
            } else {
              navigate("/login");
            }

            if (window.location.pathname === "/profile") {
              navigate("/profile");
            } else if (!user.value) {
              navigate("/login");
            }
          }
        }
      },
      (error) => {
        console.log(error);
        navigate("/login");
      }
    );
  }, []);

  return <div></div>;
};

export default Auth;
