import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext'
import { OrderProvider } from './context/OrderContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
     <BrowserRouter>
      <ShopContextProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </ShopContextProvider>
    </BrowserRouter>
  )
}
