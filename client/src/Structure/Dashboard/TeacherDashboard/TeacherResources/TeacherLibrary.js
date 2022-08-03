import React from 'react'
import profile from '../../../images/profile/profile.png';

const TeacherLibrary = () => {
  return (
    <div>
        <div style={{height: '80px', backgroundColor: ''}} className='bg-info'>
         <div style={{display: 'flex' , justifyContent: 'space-between'}} className='container'>
           {/* <div>
             <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
           </div> */}
            <div class="dropdown">
              <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img style={{ width: "50px" }} className='' src={profile} alt="profile"/>
              </button>
              <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
                 <a style={{color: 'tomato'}} class="dropdown-item " href="/teacherprofile">Profile</a>
                 <a style={{color: 'tomato'}} class="dropdown-item" href="#">LogOut</a>
            </div>
           </div>
           <div>
              <h3 className='pt-1' style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>Name: Teacher Name</h3>
              <h4 className='' style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>Id : Teacher Id</h4>
           </div>
        </div>
        </div>

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