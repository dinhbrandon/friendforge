import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import HomeNoToken from "../components/home/HomeNoToken";
import HomeToken from "../components/home/HomeToken";
import "./style/home.css";

function Home() {
    const { token } = useToken();

    if (token) {
        return <HomeToken token={token} />
        
        
    }

    if (!token) {
        return <HomeNoToken />;

    }
}

export default Home;
