import React from 'react';
import book1 from '../../../../images/books/book1.jpg'
import book2 from '../../../../images/books/book2.jpg'
import book3 from '../../../../images/books/book3.jpg'
import profile from '../../../../images/profile/profile.png';
import StudentHeader from '../../StudentHeader';


const EBook = () => {
    return (
        <>
            <StudentHeader />

            <section className='container'>
                <div class="row my-5">
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book1} />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book2} width="300" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book3} width="300" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book3} width="300" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book3} width="300" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book3} width="300" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book3} width="300" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3 my-4'>
                        <div style={{ border: '2px solid tomato', }} class=" card p-3 bg-white">
                            <div class="about-product text-center mt-2"><img style={{ width: '200px', height: '200px' }} src={book3} width="" />
                                <div className='py-3'>
                                    <h4>Book Name</h4>
                                    <h6 class="mt-0 text-black-50">Writer Name</h6>
                                    <button style={{ border: '2px solid tomato', color: 'tomato' }} className='my-3'>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default EBook