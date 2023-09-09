import React from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import HomeNoToken from "../components/landingpage/HomeNoToken";
import HomeToken from "../components/landingpage/HomeToken";
import "./style/home.css";

function Home() {
    const { token } = useAuthContext();

    if (token) {
        return <HomeToken />
    }

    if (!token) {
        return <HomeNoToken />;

    }
}

export default Home;
