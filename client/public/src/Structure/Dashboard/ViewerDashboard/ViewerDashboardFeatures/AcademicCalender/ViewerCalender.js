import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ViewerHeader from '../../ViewerHeader';

const ViewerCalender = () => {
    const [calender, setcalender] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/calender/teacher?school_info_id=${localStorage.getItem("school_id")}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }
        ).then((response) => {
            setcalender(response.data);
        });
    }, []);
    return (
        <div>
            <ViewerHeader />
            <section className="py-5">
                <h2
                    style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
                    className="px-3 py-2 bg-info bg-gradient"
                >
                    Organization Information
                </h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Schedule Type</th>
                            <th scope="col">Schedule Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calender.map((info) => {


                            return (
                                <tr key={info.id}>
                                    <td style={{ textAlign: 'center' }}>{info.topics}</td>
                                    <td style={{ textAlign: 'center' }}>{info.date}</td>

                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </section>

        </div>
    );
};

export default ViewerCalender;