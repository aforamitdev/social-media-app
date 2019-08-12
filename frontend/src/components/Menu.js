import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#f4f4f4" };
  }
};

export const signout = next => {
  if (typeof window !== "undifinde") {
    localStorage.removeItem("jwt");
  }
  next();
  return fetch("fetch://localhost:8080/signout", {
    method: "GET"
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(err => console.log(err));
};
const Menu = props => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link
          className="nav-link active"
          to="/"
          style={isActive(props.history, "/")}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/signup"
          style={isActive(props.history, "/signup")}
        >
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/signin"
          style={isActive(props.history, "/signin")}
        >
          signin{" "}
        </Link>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          style={isActive(props.history, "/signin")}
          onClick={() => signout(() => props.history.push("/"))}
        >
          Sign Out
        </a>
      </li>
    </ul>
    {/* {JSON.stringify(props.history)} */}
  </div>
);
export default withRouter(Menu);
