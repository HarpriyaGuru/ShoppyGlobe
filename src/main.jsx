import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import "./index.css";
import App from "./App.jsx";
import ProductList from "./components/ProductList/ProductList";
import NotFound from "./components/NotFound/NotFound.jsx";
import ProductItem from "./components/ProductItem/ProductItem.jsx";
import Category from "./components/Category/Category.jsx";
import Cart from "./components/Cart/Cart.jsx";
import appStore from "./utils/appStore.js";
import { addItem,removeItem,clearCart } from "./utils/cartSlice.js";
import CartItem from "./components/Cart/CartItem.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/c",
    element: <CartItem />
    },
  {
    path: "/home",
    element: <App />
  },
  {
    path: "/products",
    element: <ProductList />
  },
  {
    path: "/cart",
    element: <Cart />
  },

  {
    path:"/category/:categoryName",
    element:<Category />
  },
  {
    path: "/product/:id",
    element: <ProductItem/>
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetail />
  },
  {
    path:"*", 
    element:<NotFound />
  }
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />    
  </Provider>
);
