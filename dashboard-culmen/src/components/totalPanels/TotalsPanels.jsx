import { TotalCard, TotalContainer, TotalWrapper } from './TotalStyles'
//import PropTypes from 'prop-types';


const TotalsPanels = ( {products , users} ) => {
  
  return (
    <TotalContainer>
      <TotalWrapper>
        <TotalCard>
          <span>{products.count}</span>
          <p>TOTAL PRODUCTOS</p>
        </TotalCard>

        <TotalCard>
          <span>{users.count}</span>
          <p>TOTAL DE USUARIOS</p>
        </TotalCard>

        <TotalCard>
          {products.countByCategory && (
            <span> {products.countByCategory.length} </span>
          )}
          <p>TOTAL DE CATEGORIAS</p>
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