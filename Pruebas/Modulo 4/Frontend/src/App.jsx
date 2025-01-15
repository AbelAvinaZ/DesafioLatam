import { useRoutes } from "react-router"
import { PizzaProvider } from "./context/PizzaContext";
import CartProvider from "./context/CartContext";

import Routes from "../routes/Routes";
import UserProvider from "./context/UserContext";

function App() {
  const AppRoutes = () => useRoutes(Routes());

  return (
    <CartProvider>
      <UserProvider>
        <PizzaProvider>
          <AppRoutes />
        </PizzaProvider>
      </UserProvider>
    </CartProvider>
  );
}

export default App
