import React from "react";
import "./LogInModal.css"; // CSS for the modal and background blur

const LogInModal = ({ closeModal }) => {
  return (
    <div className="LogInModal">
      <form>
        <button onClick={closeModal} className="close-btn">
          X
        </button>
        <p>Please Sign Up or Log In to an existing Account</p>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" id="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogInModal;
