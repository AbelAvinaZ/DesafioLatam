import { Route, Routes } from "react-router"
import routes from '../routes/routes'

function App() {

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default App
