import React from "react";
import "./style/forge.css";
import people from "../components/forge/people.png";
import ForgeGroup from "../components/forge/enterforge";

function Forge() {
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="card w-96 glass">
                    <figure>
                        <img src={people} alt="People" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Welcome to the forge</h2>
                        <p>Select a group focus</p>
                        <ForgeGroup />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forge;
