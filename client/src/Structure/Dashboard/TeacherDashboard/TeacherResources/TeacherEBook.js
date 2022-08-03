import React from 'react'
import book1 from '../../../images/books/book1.jpg'
import book2 from '../../../images/books/book2.jpg'
import book3 from '../../../images/books/book3.jpg'
import profile from '../../../images/profile/profile.png';


const TeacherEBook = () => {
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

       <section className='container'>
      <div class="row my-5">
        <div  className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div  class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book1} />
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}  className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book2} width="300"/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book3} width="300"/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book3} width="300"/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book3} width="300"/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book3} width="300"/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book3} width="300"/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>
        <div className='col-sm-3 my-4'>
        <div style={{border: '2px solid tomato', }} class=" card p-3 bg-white">
            <div class="about-product text-center mt-2"><img style={{width: '200px', height: '200px'}} src={book3} width=""/>
                <div className='py-3'>
                    <h4>Book Name</h4>
                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                    <button  style={{border: '2px solid tomato', color: 'tomato' }}   className='my-3'>Download</button>
                </div>
            </div>
        </div>
        </div>

    </div>
       </section>
    </div>
  )
}

export default TeacherEBook