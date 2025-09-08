import React from 'react'
import img2 from '../assets/hero-img.jpg';


const Function = () => {
  return (
    <>
        <div className="container m-5">
            <div className="row m-5  pl-5 text-center" ><h1 style={{fontWeight:"600"}}> Functions</h1></div>
            <div className="row mb-5">
                <div className="col-6 mt-5">
                    <img src={img2} style={{width:"100%"}}/>
       
                </div>

                <div className="col-6 p-5 mt-5 mb-4 ">
                    <h2 className="titles">Real-Time Task Updates</h2>
                    <h5 className="subtitiles">Instantly sync changes across your team.</h5>

                    <h2 className="titles mt-5"> Drag & Drop Interface </h2>
                    <h5 className="subtitiles"> Move tasks between columns effortlessly.</h5>

                    <h2 className="titles mt-5"> Task Assignment & Tracking</h2>
                    <h5 className="subtitiles">Assign tasks, set deadlines & monitor progress</h5>
               
                </div>
            </div>
           
           </div>
        
    </>
  )
}

export default Function
