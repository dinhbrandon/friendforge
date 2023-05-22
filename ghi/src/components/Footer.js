import React from "react";
import facebook from "./images/facebook.png";
import tiktok from "./images/tiktok.png";
import twitter from "./images/twitter.png";
import "./style/footer.css"

function Footer() {
  return (
    <footer>
      <p>© Friend Forge 2023</p>
      <p>
        <a href="/aboutus">About Us</a>
        <a href="/contactus">Contact Us</a>
        <a href="/carreers">Careers</a>
        <a href="/tos">TOS</a>
      </p>
      <p>
        <a href="#"><img src={facebook}/></a>
        <a href="#"><img src={tiktok}/></a>
        <a href="#"><img src={twitter}/></a>
      </p>
    </footer>
  );
}

export default Footer;
