import PizzeriaNavbar from './components/Navbar/PizzeriaNavbar'
import Footer from "./components/Footer/Footer"
import { Home } from './views/Home'
import LoginForm from './views/LoginForm'
import { Pizza } from './views/Pizza/Pizza'
import { Cart } from './views/Cart/Cart'
import RegisterForm from "./views/private/Register/RegisterForm"
import { Route, Routes } from "react-router"
import { NotFound } from './views/NotFound'
import { Profile } from './views/private/Profile'

function App() {

  return (
    <div className="h-screen flex flex-col justify-between">
      <PizzeriaNavbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/register'
          element={<RegisterForm />}
        />
        <Route
          path='/login'
          element={<LoginForm />}
        />
        <Route
          path='/cart'
          element={<Cart img={Cart.img} key={Cart.id} count={Cart.count} price={Cart.price} name={Cart.name} />}
        />
        <Route
          path='/pizza/p001'
          element={< Pizza />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/*'
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
