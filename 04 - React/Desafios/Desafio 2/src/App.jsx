import PizzeriaNavbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer"
import RegisterForm from './views/private/Register/RegisterForm'
import LoginForm from "./views/LoginForm"
import './App.css'

function App() {

  return (
      <div className="min-h-screen flex flex-col">
        <PizzeriaNavbar />
        <RegisterForm />
        <LoginForm />
        <Footer />
      </div>
  )
}

export default App
