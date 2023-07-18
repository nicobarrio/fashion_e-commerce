import React from 'react'
import { Panel, PanelCategory, PanelContainer, PanelCount, PanelTitle, PanelWrapper } from './PanelCategoriesStyles'

const PanelCategories = ({products}) => {
  console.log(products.countByCategory)
  return (
    <PanelContainer>
      <PanelTitle> PanelCategories</PanelTitle> 
      <PanelWrapper>
      {
        products.countByCategory && (
          products.countByCategory.map((c, i)=>{
            return (
              <Panel key={c.category+i}>
                <PanelCategory> {c.category.toUpperCase()} </PanelCategory>
                <PanelCount> Cantidad: {c.count} </PanelCount>
              </Panel>
            )
          })
        )
      }
      </PanelWrapper>
    </PanelContainer>
  )
}

export default PanelCategories