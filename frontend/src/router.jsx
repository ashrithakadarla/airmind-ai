import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Prediction from './pages/Prediction'
import About from './pages/About'

function RootLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'prediction',
        element: <Prediction />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

export default router
