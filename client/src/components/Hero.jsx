import React from 'react'

import img1 from '../assets/hero-img.jpg';


const Hero = () => {



  return (
    <div className="container m-5 ">
      <div className="row">
        <div className="col-6 p-5 ">
          <h1 style={{ fontWeight: "600" }} className="p-5"><span style={{ color: "#4f56ec" }}>Take Control</span> of <br />Your Projects<br /> with <span style={{ color: "#4f56ec" }}>KanbanX</span></h1>
          <p>
            KanbanX is your ultimate project management tool, designed to help teams collaborate effectively and stay organized. With features like real-time updates, task assignment, and customizable workflows, it's the perfect solution for managing your projects.
          </p>
          <p>
            Drag and drop tasks, track progress, and customize your board to fit your workflow. Stay productive and meet your goals with ease!
          </p>
        </div>
        <div className="col-6 mt-5">
          <img src={img1} style={{ width: "100%" }} />

        </div>
      </div>
    </div>
  )
}

export default Hero
