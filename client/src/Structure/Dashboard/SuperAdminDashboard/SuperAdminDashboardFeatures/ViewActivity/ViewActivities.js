import React from 'react'

const ViewActivities = () => {
    return (
        <section className='py-3 container'>
            <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Activities : </h2>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">School Code</th>
                        <th scope="col">Student ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Section</th>
                        <th scope="col">Status</th>
                        <th scope="col">Submission Date</th>
                        <th scope="col">Activities File</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Code</td>
                        <td>0132874777</td>
                        <td>Tasmi Jahan</td>
                        <td>Seven</td>
                        <td>A</td>
                        <td>Submit</td>
                        <td>10 Feb 2022 </td>
                        <td style={{ color: 'blue' }}>Open File</td>
                    </tr>




                </tbody>
            </table>
        </section>
    )
}

export default ViewActivities