import PizzeriaNavbar from './components/Navbar/PizzeriaNavbar'
import Footer from "./components/Footer/Footer"
// import { Home } from './views/Home'
import './App.css'
import { Pizza } from './components/Pizza/Pizza'
// import { Cart } from './components/Cart/Cart'

function App() {

  return (
    <div className="h-screen flex flex-col justify-between">
      <PizzeriaNavbar />
      {/* <Home /> */}
      {/* <Cart img={Cart.img} key={Cart.id} count={Cart.count} price={Cart.price} name={Cart.name}/> */}
      < Pizza />
      <Footer />
    </div>
  )
}

export default App
