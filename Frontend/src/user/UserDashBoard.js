import React from "react";
import Base from "../core/Base";
import Footer from "../core/Footer";
import { isAutheticated } from "../auth/helper/index";

const UserDashBoard = () => {

  const {
    user: { name, email }
  } = isAutheticated();

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <h6><span className="badge bg-success mr-2">Name:</span> {name}</h6>
          </li>
          <li className="list-group-item">
            <span className="badge bg-success">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge bg-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
    <Base
      title="User Dashboard Page"
      description="Welcome to your Dashboard"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-9">{userRightSide()}</div>
      </div>
    </Base>
    <div style={{marginTop:"210px"}}>
      <Footer />
    </div>
    </>
  );
};

export default UserDashBoard;
