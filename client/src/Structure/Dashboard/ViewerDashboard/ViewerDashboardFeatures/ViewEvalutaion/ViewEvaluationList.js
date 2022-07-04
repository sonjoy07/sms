import React from 'react';
import { useNavigate } from 'react-router-dom';
import evaluation from "../../../../images/icons/evaluation.png";
import ViewerHeader from '../../ViewerHeader';
const ViewEvaluationList = () => {
    let navigate = useNavigate();
    return (
        <div>
            <ViewerHeader />
            <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1"
                onClick={() => {
                    navigate("/view-mark-sheet");
                }}>
                <div class="card bg-light shadow-sm">
                    <div class="card-body py-4">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className=""
                        >
                            <div className="px-3">
                                <img
                                    style={{ width: "64px", height: "64px" }}
                                    src={evaluation}
                                    alt=""
                                />
                            </div>
                            <div className="px-3">
                                <h4 class="card-title">Check Mark Sheet</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1"
                onClick={() => {
                    navigate("/viewevaluation");
                }}>
                <div class="card bg-light shadow-sm">
                    <div class="card-body py-4">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className=""
                        >
                            <div className="px-3">
                                <img
                                    style={{ width: "64px", height: "64px" }}
                                    src={evaluation}
                                    alt=""
                                />
                            </div>
                            <div className="px-3">
                                <h4 class="card-title">Check Grade Sheet</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ViewEvaluationList;