import { TotalCard, TotalContainer, TotalWrapper } from './TotalStyles'
//import PropTypes from 'prop-types';


const TotalsPanels = ( {products , users} ) => {
  
  return (
    <TotalContainer>
      <TotalWrapper>
        <TotalCard>
          <p>TOTAL PRODUCTOS</p>
          <span>{products.count}</span>
        </TotalCard>

        <TotalCard>
          <p>TOTAL DE USUARIOS</p>
          <span>{users.count}</span>
        </TotalCard>

        <TotalCard>
          <p>TOTAL DE CATEGORIAS</p>
          {products.countByCategory && (
            <span> {products.countByCategory.length} </span>
          )}
        </TotalCard>
      </TotalWrapper>
    </TotalContainer>
  );
}

/* TotalsPanels.propTypes = {
  products: PropTypes.shape({
    count: PropTypes.number.isRequired,
    countByCategory: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })),
  }).isRequired,
  users: PropTypes.shape({
    count: PropTypes.number.isRequired,
  }).isRequired,
}; */

export default TotalsPanels