import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuhProvider from './AuthProvider/AuhProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuhProvider>
   <RouterProvider router={router} />
   </AuhProvider>
  </StrictMode>,
)
