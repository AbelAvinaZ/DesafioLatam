import { useRoutes } from "react-router"
import { PizzaProvider } from "./context/PizzaContext";
import CartProvider from "./context/CartContext";

import routes from "../routes/Routes";

function App() {
  const AppRoutes = () => useRoutes(routes);

  return (
    <PizzaProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </PizzaProvider>
  );
}

export default App
