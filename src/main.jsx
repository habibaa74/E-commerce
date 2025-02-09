import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./../node_modules/flowbite/dist/flowbite.min.js"
import './index.css'
import App from './App.jsx'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import TokenContextProvider from './Context/TokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx'
import WishListContextprovider from './Context/WishListContext.jsx'
createRoot(document.getElementById('root')).render(
<TokenContextProvider>
  <CartContextProvider>
  <WishListContextprovider>
    <StrictMode>
    <App />
  </StrictMode>
  </WishListContextprovider>
  </CartContextProvider>
</TokenContextProvider>

)
