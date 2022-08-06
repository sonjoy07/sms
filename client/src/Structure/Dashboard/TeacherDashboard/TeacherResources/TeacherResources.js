import React from 'react'
import library from '../../../images/icons/library.png'
import ebook from '../../../images/icons/ebook.png'
import link from '../../../images/icons/link.png'
import TeacherHeader from '../TeacherHeader/TeacherHeader';

const TeacherResources = () => {
  return (
    <div>
      <TeacherHeader />
      <section class="container mt-5 pt-2">
        <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-4'>Resource</h2>
        <div class="row mx-auto mt-4">
          <a href='/teacherlibrary' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                  <div className='px-3'>
                    <img style={{ width: '64px', height: '64px' }} src={library} alt="" />
                  </div>
                  <div className='px-3'>
                    <h4 class="card-title">Library</h4>
                  </div>
                </div>

              </div>
            </div>
          </a>
          <a href='/teacherebook' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                  <div className='px-3'>
                    <img style={{ width: '64px', height: '64px' }} src={ebook} alt="" />
                  </div>
                  <div className='px-3'>
                    <h4 class="card-title">eBook</h4>
                  </div>
                </div>

              </div>
            </div>
          </a>
          <a href='/teacherimportantlink' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
            <div class="cimport TeacherHeader from './../TeacherHeader/TeacherHeader';
ard bg-light shadow-sm">
              <div class="card-body py-4">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                  <div className='px-3'>
                    <img style={{ width: '64px', height: '64px' }} src={link} alt="" />
                  </div>
                  <div className='px-3'>
                    <h4 class="card-title">Important Link</h4>
                  </div>
                </div>

              </div>
            </div>
          </a>




        </div>

      </section>
    </div>
  )
}

export default TeacherResources