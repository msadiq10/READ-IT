import React from 'react'
import './Login.css'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import Background from '../../components/backgroundImg/Background'
function Login(props) {
	return (
		<Background>
			<div className='card'>
				<section className='loginContainer'>
					<label>Email</label>
					<input className='control' type='text' required placeholder='Email address' />
					<p className='errorMsg'></p>
					<label>Password</label>
					<input className='control' type='password' placeholder='Enter your password' required />
					<p className='errorMsg'></p>
					<section className='signupBtn'>
						<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} to={{ pathname: '/home' }}>
							Login
						</Button>
					</section>
					<div className='msgContainer'>
						<p className='msg'>Do you have an account?</p>
						<Link to='/signup'>
							<Button buttonStyle={'loginBtn'} buttonSize={'LoginsmallBtn'}>
								Signup
							</Button>
						</Link>
					</div>
				</section>
			</div>
		</Background>
	)
}

export default Login

// <i class='far fa-envelope'></i>
// <i class='fas fa-lock'></i>
