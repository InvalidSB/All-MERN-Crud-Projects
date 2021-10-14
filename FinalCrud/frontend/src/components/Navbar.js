import React from 'react'
import {Link} from "react-router-dom"


function Navbar() {
    return (
        <div>
           <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <div class="container">
    <Link class="navbar-brand" to="/" style={{color:"white"}}>Home</Link>
    <button class="navbar-toggler" type="button" style={{color:"white"}} data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
       
        <li class="nav-item">
          <Link class="nav-link" to="/posts/add" style={{color:"white"}}>

            <button className="btn btn-success" style={{backgroundColor:"#48dbfb"}}>
<a href={`/posts/add`} style={{textDecoration:"none",color:"black"}}>Add new post</a>
</button>
          </Link>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
