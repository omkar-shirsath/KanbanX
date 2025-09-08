import React from 'react'

const FooterHomePage = () => {
  return (
    <>
      <div className="footer pt-5 ps-5 pe-5 mt-5">
        <div className='container'>
          <div className='row'>
            <div className = 'col p-5'>
                <h5>Different Links</h5>
                <ul className="text-muted">
                  <li><a className="text-muted" href = "#">Home</a></li>
                  <li><a className="text-muted" href = "#">Features</a></li>
                  <li><a className="text-muted" href = "#">Team</a></li>
                  <li><a className="text-muted" href = "#">Login</a></li>
                  <li><a  className="text-muted" href = "#">Sign up</a></li>
                </ul>
            </div>

            <div className = 'col p-5 '>
              <h5>Contact Methods</h5>
              <ul>
              <li><a className="text-muted" href = "#">Fead Back form</a></li>
              <li><a className="text-muted" href = "#">kanbanx@gmail.com</a></li>
              </ul>
            </div>

            <div className = 'col p-5'>
                <h5>Read More About</h5>

                <ul>
                  <li><a className="text-muted" href = "https://getnave.com/blog/kanban-benefits/">Benifites of using kanbanx</a></li>
                  <li><a className="text-muted" href = "https://www.planview.com/resources/guide/introduction-to-kanban/use-kanban-boards/">Why use kanbanx</a></li>
                </ul>
            </div>

          </div>
          <div className='row'>
            <p className="text-muted">
                © 2025 <span className="font-semibold">KanbanX</span>. All rights reserved. 
                Built by <span className="font-semibold">Team KanbanX</span> with ❤️.
            </p>
          </div>
        </div>
      </div>
    </>
  )
};

export default FooterHomePage
