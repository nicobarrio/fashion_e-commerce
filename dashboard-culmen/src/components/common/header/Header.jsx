import { HeaderContainer , Li, LogoImage, Nav, PictureImg, Ul } from './Header'
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../../public/Logo_Transparente.png'



const Header = () => {
  return (
    <HeaderContainer>
      <PictureImg><LogoImage src={logo} alt="" /></PictureImg>
      <Nav>
        <Ul>
          <Li><Link className={styles.link} to='/' >Paneles</Link></Li>
          <Li> <Link className={styles.link} to='/panelCategories' >Categories</Link></Li>
          <Li><Link className={styles.link} to='/productList' >Products</Link></Li>
          <Li><Link className={styles.link} to='/detailLastProduct' >Last product</Link></Li>
          <Li><Link className={styles.link} to='http://localhost:3030' >Culmen</Link></Li>
        </Ul>
      </Nav>
    </HeaderContainer>

  )
}

export default Header