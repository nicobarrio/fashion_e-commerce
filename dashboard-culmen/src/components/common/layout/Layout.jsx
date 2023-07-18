import Header from '../header/Header.jsx'
import Footer from '../footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './LayoutStyle.module.css'

const Layout = () => {
  const location = useLocation();
  const activeComponent = location.pathname.replace('/', ''); // Obtener el nombre del componente activo eliminando el primer '/'
  const isTableComponentActive = activeComponent === 'table';

  return (
    <div style={{backgroundColor: 'white'}} className={`${styles.fondo} ${isTableComponentActive ? styles.withTable : ''}`} >
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout