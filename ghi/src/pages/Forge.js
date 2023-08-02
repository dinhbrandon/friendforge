import React from "react";
import "./style/forge.css";
import people from "../components/forge/people.png";
import ForgeGroup from "../components/forge/forgeGroup";

function Forge() {
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="card w-auto h-auto glass hover:scale-100 flex flex-col justify-center items-center">
                    <figure>
                        <img className="h-40 w-40" src={people} alt="People" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Welcome to the forge</h2>
                        <ForgeGroup />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forge;
