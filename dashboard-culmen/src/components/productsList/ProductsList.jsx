import React from 'react'
import { TableContainer, Table, Th, Tr, Td, DetailLink } from './ProductsListStyles'

const ProductsList = ( { products } ) => {
  return (
    <TableContainer>
    <Table>
      <thead>
        <tr>
          <Th>Id</Th>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Detalle en web</Th>
        </tr>
      </thead>
      <tbody>
        {
          products.products &&
          products.products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td><DetailLink href={`http://localhost:3030/products/${product.id}`}> Ver detalle </DetailLink></Td>
            </Tr>
          ))
        }
      </tbody>
    </Table>
  </TableContainer>
  )
}

export default ProductsList