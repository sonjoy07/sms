import React from 'react'
import TeacherHeader from './../TeacherHeader/TeacherHeader';

const TeacherLibrary = () => {
  return (
    <div>      
      <TeacherHeader/>
        <section className='py-5 container'>
    <h2 style={{color: 'white', textAlign: 'center'}} className='px-4 py-2 bg-info bg-gradient'>Library </h2>

 <table class="table table-striped">
<thead>
<tr style={{textAlign: 'center'}}>
<th scope="col">Writer</th>
<th scope="col">Book Name</th>
<th scope="col">Rental Status</th>
<th scope="col">Book Now</th>
</tr>
</thead>
<tbody>
<tr style={{textAlign: 'center'}}>

<td>The Living Name</td>
<td>Sacinan Dana</td>
<td>Rental</td>
<td style={{color: 'blue'}}>Book Now</td>
</tr>
<tr style={{textAlign: 'center'}}>

<td>The Living Name</td>
<td>Sacinan Dana</td>
<td>Rental</td>
<td style={{color: 'blue'}}>Book Now</td>
</tr>
<tr style={{textAlign: 'center'}}>

<td>The Living Name</td>
<td>Sacinan Dana</td>
<td>Rental</td>
<td style={{color: 'blue'}}>Book Now</td>
</tr>



</tbody>
</table>
        </section>
    </div>
  )
}

export default TeacherLibrary