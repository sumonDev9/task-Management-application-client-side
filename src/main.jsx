import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './AuthProvider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <ToastContainer position="top-center" autoClose="1000" />
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
