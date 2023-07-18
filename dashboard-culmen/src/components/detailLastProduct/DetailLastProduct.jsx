import React from "react";
import { useState, useEffect } from "react";
import {ContainerImg, Font1, Font2, Font3, LastProductWrapper} from './DetailLastStyles';



const DetailLastProduct = ({ products }) => {

  const [lastProductDetail, setLastProductDetail] = useState({
    product: {
      name: "",
      description: "",
      brand: "",
      category: "",
      type: "",
      price: "",
    },
  });

  let lastProduct = products.products ? products.products[products.products.length - 1] : null;

  useEffect(() => {
    (async () => {
        let detailResponse;
        if (lastProduct && lastProduct.link) {
            detailResponse = await fetch(lastProduct.link).then((res) => res.json());
        }
        //setLastProductDetail(detailResponse);
        detailResponse && detailResponse.product && setLastProductDetail(detailResponse);

        })();
    }, [lastProduct]);

  console.log(lastProductDetail.product);

  return (
    <LastProductWrapper>
      {lastProductDetail.product && (
        <>
          <div>
            <Font3> Último producto agregado 👇🏼!! </Font3>
            <Font2>Nombre: <Font1>{lastProductDetail.product.name.toUpperCase()}</Font1> </Font2>
            <Font2>Descripcion <Font1>{lastProductDetail.product.description.toUpperCase()}</Font1> </Font2>
            <Font2>Marca: <Font1>{lastProductDetail.product.brand.toUpperCase()}</Font1> </Font2>
            <Font2>Categoria:<Font1> {lastProductDetail.product.category.toUpperCase()}</Font1> </Font2>
            <Font2>Tipo: <Font1>{lastProductDetail.product.type.toUpperCase()}</Font1> </Font2>
            <Font2>Precio: <Font1>{lastProductDetail.product.price}</Font1> </Font2>
          </div>
          <ContainerImg>
            <img
              src={lastProductDetail.product.image}
              alt="imagen del ultimo producto"
              style={{ width: "200px" }}
          />
          <a href={`http://localhost:3030/products/${lastProductDetail.product.id}`}> VER DETALLE DEL PRODUCTO </a>
         {/*  href={`http://localhost:3030/products/${product.id}`} */}
          </ContainerImg>
          
        </>
      )}
    </LastProductWrapper>
  );
};

export default DetailLastProduct;
