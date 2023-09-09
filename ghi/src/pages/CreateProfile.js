import React from "react";
import CreateProfileForm from "../components/userauth/CreateProfileForm";

function CreateProfile() {
    return (
        <>
            <div className="hero bg-base-100">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-5xl font-bold">
                            Create Your Profile!
                        </h1>
                        <p className="py-6">
                        </p>
                    </div>
                </div>
            </div>

            <CreateProfileForm />
        </>
    );
}

export default CreateProfile;
