import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Sign_in from './pages/Sign_in'
import Sign_up from './pages/Sign_up'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign_in' element={<Sign_in />} />
        <Route path='/sign_up' element={<Sign_up />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App