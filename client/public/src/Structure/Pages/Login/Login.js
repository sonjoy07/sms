import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  let navigate = useNavigate();

  const [user_code, setUser_code] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const goToLink = (type) => {
    if (localStorage.getItem("access_token")) {
      switch (type) {
        case 1:
          navigate("/student-admin");
          break;
        case 2:
          navigate("/teacher-admin");
          break;
        case 4:
          navigate("/school-admin");
          break;
        case 5:
          navigate("/super-admin");
          break;
        case 6:
          navigate("/viewer-school");
          break;
      }
    } else {
      setTimeout(goToLink, 50);
    }
  };
  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_code: user_code,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.errorMsg) {
          setErrorMsg(json.errorMsg);
        } else {
          fetch(
            `${process.env.REACT_APP_NODE_API}/api/users/user_id?user_code=${user_code}&user_type=${json.user_type_id}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + json.accessToken,
              },
            }
          )
            .then((res) => res.json())


            .then((json2) => {
              console.log(json2);
              localStorage.setItem("user_code", json2.id);
              localStorage.setItem("user_type", json.user_type_id);
              localStorage.setItem("u_id", json.user_code);
              localStorage.setItem("school_id", json2.school_id);
              localStorage.setItem("school_type", json2.school_type);
              localStorage.setItem("class", json2.class);
              localStorage.setItem("admin_code", json2.admin_code);
              localStorage.setItem("first_name", json2.first_name);
              localStorage.setItem("last_name", json2.last_name);
              localStorage.setItem("school_name", json2.school_name);
              localStorage.setItem("school_info_id", json2.school_info_id)
              localStorage.setItem("access_token", json.accessToken);
              props.setUser[0](json2.id);
              props.setUser[0](json.user_type_id);

              goToLink(json.user_type_id);
            });
        }
      });
  };

  return (
    // , margin: '200px 0px'
    <div
      style={{ display: "flex", justifyContent: "center", margin: "11% 0px" }}
      className=""
    >
      <div style={{ width: "450px", height: "450px" }} class="card p-4">
        <div class="card-body login-card-body">
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
            }}
            className="pb-4"
          >
            Sign in
          </h3>
          <div class="input-group mb-3">
            <input
              autocomplete="off"
              focusid="1"
              id="user_id"
              name="user_id"
              type="text"
              class="form-control"
              placeholder="User ID / Email / Phone"
              value={user_code}
              onChange={(e) => setUser_code(e.target.value)}
            />
            {/* <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-user"></span>
                        </div>
                    </div> */}
          </div>
          <div class="input-group mb-3">
            <input
              focusid="2"
              id="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {/* <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                        </div>
                                        </div> */}
          </div>
          <div class="social-auth-links text-center mb-2">
            <button
              onClick={handleSubmit}
              style={{ width: "100%" }}
              focusid="3"
              class="btn btn-block btn-primary mb-3"
            >
              Sign in <i class="fas fa-sign-in-alt"></i>
            </button>
            <div class="lockscreen-footer text-center">
              <span>
                <a
                  href="http://digipathbd.com/"
                  class="text-black"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </a>
              </span>{" "}
              |{" "}
              <span>
                <a href="#" class="text-black" target="_blank">
                  Privacy Policy
                </a>
              </span>
              <br />
              Copyright © 2017-2023{" "}
              <b>
                <a href="http://digipathbd.com/" class="text-black">
                  ePathShala
                </a>
              </b>
              <br />
              All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
