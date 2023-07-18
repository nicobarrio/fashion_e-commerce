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
          <Li><Link className={styles.link} to='/' >Total Panels</Link></Li>
          <Li><Link className={styles.link} to='/detailLastProduct' >Detail Last Product</Link></Li>
          <Li> <Link className={styles.link} to='/panelCategories' >Panel Categories</Link></Li>
          <Li><Link className={styles.link} to='/productList' >Product List</Link></Li>
          <Li><Link className={styles.link} to='http://localhost:3030' >Web Site</Link></Li>
        </Ul>
      </Nav>
    </HeaderContainer>

  )
}

export default Header