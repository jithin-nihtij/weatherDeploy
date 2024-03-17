import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className='weatherHome'>

        <div className='weatherHomeFirst'>
            <h1 className='welcome'>Welcome to knoWeather</h1>
           
        </div>
        <div className='weatherHomeSecond'>
            <div className='my-2'> <Link to={'/login'}><Button className='loginBtnHome'>Login</Button></Link></div>
            
            <div className='my-2'><Link to={'/signup'}><Button className='signUpBtnHome'>Sign Up</Button></Link></div>
        </div>
    </div>
  )
}

export default Home