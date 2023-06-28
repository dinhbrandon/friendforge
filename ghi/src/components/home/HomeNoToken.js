import React from "react";
import HomeStats from "./HomeStats";
import Steps from "./Steps";
import people1 from "./people1.png";

function HomeNoToken() {
    return (
        <>
            <div className="hero bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={people1}
                        className="max-w-sm"
                        alt="people cartoon"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            Friend Forge (BETA)
                        </h1>
                        <p className="py-10">
                            Making friends for any reason, at any time, and any place in the world.
                        </p>
                    </div>
                </div>
            </div>

            <div className="hero gradient-bg">
                <div className="hero-overlay bg-opacity-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold pt-20">
                            Gathering made easy!
                        </h1>
                        <p className="mb-5">
                            Let's forge some new friendships on your terms. 
                        </p>
                        <HomeStats />
                    </div>
                </div>
            </div>

            <div className="hero bg-base-200">
                <Steps />
            </div>
        </>
    );
}

export default HomeNoToken;
