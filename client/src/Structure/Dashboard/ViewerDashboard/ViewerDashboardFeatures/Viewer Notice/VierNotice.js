import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from "moment";
import { useNavigate, useSearchParams } from 'react-router-dom';
import ViewerHeader from '../../ViewerHeader';
const VierNotice = () => {

  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [student, setStudent] = useState([]);
  const [notice, setNotice] = useState([]);
  const [newNotice, setNew] = useState([])
  const [search_issue_date, setSearch_Issue_date] = useState("");
  const [search_due_date, setSearch_Due_date] = useState("");
  const type = searchParams.get('type')

  console.log(user_code);
  const checkLoggedIn = () => {
    if (user_type != 6) {
      navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/notice/school?school_info_id=${localStorage.getItem("school_id")}&&type=${type}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )



      .then((response) => {

        setNotice(response.data);
      });

  }, []);
  const uniqueIds = [];

  const newNote = notice.filter(element => {
    const isDuplicate = uniqueIds.includes(element.school_info_id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  let handleIssueDateSearchChange = (e) => {
    setSearch_Issue_date(e.target.value);
  };
  let handleDueDateSearchChange = (e) => {
    setSearch_Due_date(e.target.value);
  };
  const handleSearch = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/notice/student?school_info_id=${localStorage.getItem("school_id")}&&type=${type}&&start_date=${search_issue_date}&&end_date=${search_due_date}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setNotice(response.data);
      });
  };


  return (
    <div>
      <ViewerHeader />
      <div className="container">
        <h3 className='text-center py-2 '>Note's List</h3>
        <div className="row">
          <div class={"col-sm-4 p-2 mx-auto"}>
            <div class="form-group">
              <label className="pb-2" for="exampleInputEmail1">
                Start Date :{" "}
              </label>
              <input
                style={{ border: "1px solid blue" }}
                type="date"
                class="form-control"
                value={search_issue_date}
                onChange={handleIssueDateSearchChange}
              />
            </div>
          </div>
          <div class={"col-sm-4 p-2 mx-auto"}>
            <div class="form-group">
              <label className="pb-2" for="exampleInputEmail1">
                End Date :{" "}
              </label>
              <input
                style={{ border: "1px solid blue" }}
                type="date"
                class="form-control"
                value={search_due_date}
                onChange={handleDueDateSearchChange}
              />
            </div>
          </div>
          <div class={"col-sm-2 p-2"}>
            <div className='pt-2 mx-auto'>
              <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
        {notice.map((noticeJSON) => {

          return (
            <div className="row mt-4">
              <div className=" col-md-12">
                <div className="card card-dark collapsed-card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between px-4">
                      <div>
                        <h3
                          style={{
                            color: "LightSeaGreen",
                            fontSize: "25px",
                            fontWeight: "700",
                          }}
                          class="card-title pt-2"
                        >
                          {noticeJSON.notice_headline}
                        </h3>
                        <h5
                          style={{
                            color: "LightSeaGreen",
                            fontSize: "18px",
                            fontWeight: "400",
                          }}
                          class="card-title pt-2"
                        >
                          {/* {noticeJSON.subject_name} */}
                        </h5>
                      </div>
                    </div>

                  </div>

                  <div className="container">
                    <div className="mt-2">
                      <div
                        className=""
                        style={{
                          background: "#EFEFEF",
                          height: "",
                          padding: "0",
                        }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            <div className="row" style={{ background: "#fff" }}>
                              <a
                                onClick={() => {
                                  localStorage.setItem("noticeid", noticeJSON.id);
                                  navigate("#");
                                }}
                                style={{ textDecoration: "none" }}
                                className="col-12"
                              >
                                <div>
                                  <h5
                                    style={{ textAlign: "left", color: "black" }}
                                    className="py-3"
                                  >
                                    {noticeJSON.notice_description}
                                  </h5>
                                </div>
                                <div
                                  style={{ display: "flex", alignItem: "center" }}
                                >
                                  {/* <i
                                  style={{ color: "black" }}
                                  class="fa-solid fa-person pt-1"
                                ></i> */}
                                  <p
                                    className="px-3"
                                    style={{ textAlign: "left", color: "black" }}
                                  >
                                    {" "}
                                  </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                  {/* <i
                                  style={{ color: "black" }}
                                  class="fa-solid fa-clock  pt-1"
                                ></i> */}
                                  <p
                                    className="mx-2"
                                    style={{ textAlign: "left", color: "blue" }}
                                  >
                                    {" "}
                                    Date:{" "}
                                    {moment(noticeJSON.publishing_date).format(
                                      "Do MMM  YYYY"
                                    )}{" "}
                                  </p>
                                  <p
                                    className=""
                                    style={{ textAlign: "left", color: "black" }}
                                  ></p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VierNotice;