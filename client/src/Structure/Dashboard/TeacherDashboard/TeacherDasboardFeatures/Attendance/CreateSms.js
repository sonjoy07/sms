import React, { useState, useEffect, useRef } from "react";
const CreateSms = (props) => {
    debugger;
    return (
        <div className='container pt-4'>

            <section className='py-5'>
                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Student Details</h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label class="custom-control custom-switch mt-3">
                                    <input type="checkbox" />
                                    <span class="px-2">Select All</span>
                                </label>
                            </th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Student Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>
                                <th scope="col">
                                    <label class="custom-control custom-switch mt-3">
                                        <input type="checkbox" />
                                        <span class=""></span>
                                    </label>
                                </th>
                            </td>
                            <td>68686765</td>
                            <td>shfgakjashkj</td>
                        </tr>
                        <tr>
                            <td>
                                <th scope="col">
                                    <label class="custom-control custom-switch mt-3">
                                        <input type="checkbox" />
                                        <span class=""></span>
                                    </label>
                                </th>
                            </td>
                            <td>68686765</td>
                            <td>shfgakjashkj</td>
                        </tr>
                        <tr>
                            <td>
                                <th scope="col">
                                    <label class="custom-control custom-switch mt-3">
                                        <input type="checkbox" />
                                        <span class=""></span>
                                    </label>
                                </th>
                            </td>
                            <td>68686765</td>
                            <td>shfgakjashkj</td>
                        </tr>




                    </tbody>
                </table>
            </section>

            <div className='row'>
                <div className='col-md-12'>
                    <div className="card card-dark collapsed-card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between px-1'>
                                <div>
                                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2">Create SMS</h3>
                                </div>
                                <div className="card-tools">


                                </div>
                            </div>
                        </div>

                        <div className='card-body' >


                            <div className='row'>
                                <div class={"col-sm-12 p-2 mx-auto"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">SMS Text : </label>
                                        <textarea style={{ border: '1px solid blue' }} class="form-control" id="class" name="class">
                                        </textarea>

                                    </div>
                                </div>
                                <div class={"col-sm-2 p-2 mx-auto"}>
                                    <div className='pt-2 mx-auto'>
                                        <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default CreateSms;