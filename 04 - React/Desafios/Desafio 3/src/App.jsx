import PizzeriaNavbar from './components/Navbar/PizzeriaNavbar'
import Footer from "./components/Footer/Footer"
// import { Home } from './views/Home'
import './App.css'
import { Cart } from './components/Cart/Cart'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <PizzeriaNavbar />
      {/* <Home /> */}
      <Cart img={Cart.img} key={Cart.id} count={Cart.count} price={Cart.price} name={Cart.name}/>
      <Footer />
    </div>
  )
}

export default App
