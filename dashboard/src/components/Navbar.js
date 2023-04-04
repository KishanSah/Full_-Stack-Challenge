import React from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";
const Navbar=()=>{
    
    return (
        <div  className='header'> 
            {
                
                 <ul className='nav-ul'>
                    <h2 className='Nav-p'>CG FullStack Challenge</h2>
                    <li><Link to ="/">Home</Link></li>
                    <li><Link to ="/form">Form</Link></li>
                    {/* <li><Link to ="/details">Finding Details</Link></li> */}
                    
                </ul>
            }   
        </div>
    )
}

export default Navbar;