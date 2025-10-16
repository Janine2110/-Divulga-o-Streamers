import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasPropostas from './MinhasPropostas.tsx'
import CadPatrocinador from './CadPatrocinador.tsx'

// ----------------- Rotas de Admin
import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';    
import AdminStreamers from './admin/AdminStreamer.tsx';          
import AdminCadAdmin from './admin/AdminCadAdmin.tsx'; 
import AdminNovoStreamer from './admin/AdminNovoStreamer.tsx'; 
import AdminProposta from './admin/AdminProposta.tsx';

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },     // rota /admin
      { path: "streamers", element: <AdminStreamers /> },
      { path: "cadAdmin", element: <AdminCadAdmin /> },  
      { path: "streamers/novo", element: <AdminNovoStreamer /> },
      {path: "propostas", element: <AdminProposta /> },     // rota /admin/streamers
    ],
  },
  {
    path: '/',
    element: <Layout />,         // Layout das páginas do cliente
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:streamerId', element: <Detalhes /> },
      { path: 'minhasPropostas', element: <MinhasPropostas /> },
      { path: 'cadPatrocinador', element: <CadPatrocinador /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)