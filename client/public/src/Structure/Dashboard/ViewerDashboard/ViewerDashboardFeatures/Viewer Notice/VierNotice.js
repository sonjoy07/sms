import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import ViewerHeader from '../../ViewerHeader';
const VierNotice = () => {

    let navigate = useNavigate();
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [student, setStudent] = useState([]);
    const [notice, setNotice] = useState([]);
    const [newNotice, setNew] = useState([])

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
                `${process.env.REACT_APP_NODE_API}/api/notice/school?school_info_id=${localStorage.getItem("school_id")}`,
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


    return (
        <div>
            <ViewerHeader />
            <div className="container">
                <h3 className='text-center py-2 '>School Notice List</h3>
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
                                                                            "YYYY-MM-DD"
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