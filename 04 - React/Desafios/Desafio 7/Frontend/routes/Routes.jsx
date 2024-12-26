import { Home } from '../src/views/Home'
import LoginForm from '../src/views/LoginForm'
import { Pizza } from '../src/views/Pizza/Pizza'
import { Cart } from '../src/views/Cart/Cart'
import RegisterForm from "../src/views/private/Register/RegisterForm"
import { NotFound } from '../src/views/NotFound'
import { Profile } from '../src/views/private/Profile'
import { MainLayout } from '../layouts/MainLayout'


const routes = [
    { path: '/', element: <MainLayout> <Home /> </MainLayout> },
    { path: '/register', element: <MainLayout> <RegisterForm /> </MainLayout> },
    { path: '/login', element: <MainLayout> <LoginForm /> </MainLayout> },
    { path: '/cart', element: <MainLayout> <Cart img={Cart.img} key={Cart.id} count={Cart.count} price={Cart.price} name={Cart.name} /> </MainLayout> },
    { path: '/pizza/:id', element: <MainLayout> <Pizza /> </MainLayout> },
    { path: '/profile', element: <MainLayout> <Profile /> </MainLayout> },
    { path: '*', element: <MainLayout> <NotFound /> </MainLayout> },

]

export default routes;