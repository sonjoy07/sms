import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import ViewerHeader from "../ViewerHeader";

const ViewerSchoolViewList = () => {
  let navigate = useNavigate();

  const [school, setSchool] = useState([]);
  const [user_id, setUser_id] = useState(localStorage.getItem("user_code"));

  console.log(user_id);

  const checkLoggedIn = () => {
    if (localStorage.getItem("user_type") != 6) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/school_info?admin_id=${user_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setSchool(response.data);
      });
  }, [user_id]);

  return (
    <div>
      <ViewerHeader />
      <section className="">
        <div className="container">
          <div className="card card-primary">
            <div
              className="card-body"
              style={{ background: "#EFEFEF", height: "", padding: "0" }}
            >
              <div className="row">
                {school.map((schoolJSON) => {
                  return (
                    <a
                      onClick={() => {
                        localStorage.setItem("school_id", schoolJSON.id);
                        localStorage.setItem(
                          "school_name",
                          schoolJSON.school_name
                        );
                        localStorage.setItem("school_type", schoolJSON.type_id)
                        navigate("/viewer-admin");
                      }}
                      style={{ textDecoration: "none" }}
                      className="col-12 text-center"
                    >
                      <div
                        className="row"
                        style={{
                          padding: "20px",
                          margin: "10px",
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="col-10">
                          <h4
                            className="ml-3 text-primary"
                            style={{ textAlign: "left" }}
                          >
                            {schoolJSON.school_name}
                          </h4>
                          <h6
                            className="ml-3 text-success"
                            style={{
                              textAlign: "left",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Total Student: 668
                          </h6>
                          <h6
                            className="ml-3 text-warning"
                            style={{
                              textAlign: "left",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Total Present : 500
                          </h6>
                          <h6
                            className="ml-3 text-danger"
                            style={{
                              textAlign: "left",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Total Absence: 168
                          </h6>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewerSchoolViewList;
