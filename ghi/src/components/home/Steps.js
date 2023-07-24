import React from "react";
import stepone from "./stepone.png";
import steptwo from "./steptwo.png";
import stepthree from "./stepthree.png";

function Steps() {
    return (
        <section className="body-font">
            <div className="container px-5 py-20 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <h2 className="text-xs tracking-widest font-medium title-font mb-1">
                        LEARN HOW
                    </h2>
                    <h1 className="sm:text-3xl text-2xl font-medium title-font ">
                        Friend Forge Works
                    </h1>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 md:w-1/3 ">
                        <div className="flex rounded-lg h-full p-8 flex-col bg-accent text-neutral">
                            <h2 className="text-xs tracking-widest font-medium title-font mb-1">
                                STEP 1
                            </h2>
                            <figure>
                                <img src={stepone} alt="People" />
                            </figure>
                            <div className="flex-grow">
                                <p className="leading-relaxed text-base">
                                    Create your account and tell everyone a little bit about yourself.
                                    Select all of the things that you're interested and add it to
                                    your profile.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                        <div className="flex rounded-lg h-full p-8 flex-col bg-accent text-neutral">
                            <h2 className="text-xs tracking-widest font-medium title-font mb-1">
                                STEP 2
                            </h2>
                            <figure>
                                <img src={steptwo} alt="People" />
                            </figure>
                            <div className="flex-grow">
                                <p className="leading-relaxed text-base">
                                    Think of the kind of friend group you're trying to build
                                    and select it from the dropdown menu in the forge.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                        <div className="flex rounded-lg h-full p-8 flex-col bg-accent text-neutral">
                            <h2 className="text-xs tracking-widest font-medium title-font mb-1">
                                STEP 3
                            </h2>
                            <figure>
                                <img src={stepthree} alt="People" />
                            </figure>
                            <div className="flex-grow">
                                <p className="leading-relaxed text-base">
                                   Get intelligently matched into the friend group of your choice
                                   with other people who are also looking for the same type of friends.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Steps;
