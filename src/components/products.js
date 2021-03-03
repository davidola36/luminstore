import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query GetProducts {
        products {
        title,
        id,
        image_url,
        price(currency: USD)
        }
    }
`;



function Products() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.products.map(({ title, price }) => (
      <div key={title}>
        <p>
          {title}: {price}
        </p>
      </div>
    ));
}

export default Products;
