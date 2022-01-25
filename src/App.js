import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/Sign'
import User from './pages/user/User'
import Adventure from './pages/CatPages/Adventure'
import './App.css'
import Horror from './pages/CatPages/Horror'
import Humour from './pages/CatPages/Humour.js'
import NonFiction from './pages/CatPages/NonFiction'
import Romance from './pages/CatPages/Romance'
import About from "./pages/About/about";
import Account from "./pages/Account/account";
import Security from "./pages/Security/security";
import Logout from "./pages/Logout/logout";

import Settings from "./pages/Settings/Settings";
// import { AuthProvider } from './contexts/AuthContext'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' exact element={<LandingPage />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/user' element={<User />} />
				<Route path='/category/adventure' element={<Adventure />} />
				<Route path='/category/horror' element={<Horror />} />
				<Route path='/category/humour' element={<Humour />} />
				<Route path='/category/nonFiction' element={<NonFiction />} />
				<Route path='/category/romance' element={<Romance />} />
				<Route path="/settings" exact element={<Settings/>} /> 

				<Route path="/about" exact element={<About/>} />
				
				<Route path="/account" exact element={<Account/>} />
				
				<Route path="/security" exact element={<Security/>} />
				
				<Route path="/logout" exact element={<Logout/>} />
			</Routes>
		</div>
	)
}

export default App
