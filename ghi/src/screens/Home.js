import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import HomeNoToken from "../components/home/HomeNoToken";
import HomeToken from "../components/home/HomeToken";
// import LoginForm from "../components/authorization/LoginForm";
// import LoggedIn from "../components/authorization/LoggedIn";
import "./style/home.css";

function Home() {
  const { token } = useToken();

  // if (token === null) {
  //   return null;
  // }

  if (token) {
    return <HomeToken />;
  }

  if (!token) {
    return <HomeNoToken />;
  }
}

export default Home;
