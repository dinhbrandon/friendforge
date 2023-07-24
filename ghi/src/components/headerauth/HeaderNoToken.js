import React from "react";
import LoginForm from "../authorization/LoginForm";

function HeaderNoToken() {
  return (
    <>
      <label htmlFor="my-modal-4" className="btn btn-outline rounded-btn">
        LOG IN
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <LoginForm />
        </label>
      </label>
    </>
  );
}

export default HeaderNoToken;
