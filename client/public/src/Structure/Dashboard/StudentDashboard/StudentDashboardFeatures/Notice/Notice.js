import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import profile from '../../../../images/profile/profile.png';
const Notice = () => {
    const [notice, setNotice] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/notice/all`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setNotice(response.data);
            });

    }, [])
    return (
        <div>
            <div style={{ height: '80px', backgroundColor: '' }} className='bg-info'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container'>
                    {/* <div>
     <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
   </div> */}
                    <div className="dropdown">
                        <button style={{ padding: '0px' }} class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img style={{ width: "50px", height: "50px" }} src={profile} alt="profile" />
                        </button>
                        <ul class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Log out</a></li>
                            <li><a class="dropdown-item" href="#">profile</a></li>

                        </ul>
                    </div>

                </div>
            </div>
            <section className="py-5">
                <h2
                    style={{ color: "white" }}
                    className="px-5 py-2 bg-info bg-gradient"
                >
                    Information :{" "}
                </h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Publishing Date</th>
                            <th scope="col">Notice Headline</th>
                            <th scope="col">Description</th>
                            <th scope="col">Class</th>
                            <th scope="col">Section</th>

                        </tr>
                    </thead>
                    <tbody>
                        {notice.map((noticeJSON) => {
                            return (
                                <tr>
                                    <td style={{ color: "blue" }}>
                                        {moment(noticeJSON.publishing_date).format("YYYY-MM-DD")}
                                    </td>
                                    <td style={{ color: "blue" }}>
                                        {noticeJSON.notice_headline}
                                    </td>
                                    <td style={{ color: "blue" }}>
                                        {noticeJSON.notice_description}
                                    </td>
                                    <td style={{ color: "blue" }}>{noticeJSON.class_name}</td>
                                    <td style={{ color: "blue" }}>
                                        {noticeJSON.section_default_name}
                                    </td>

                                    <td>

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Notice;