import React from 'react';
import './App.scss';
import { ApolloProvider } from '@apollo/client';
import {client} from './index'
import Products from './components/products';
import Header from './components/header';


function App() {
  

  return (
    <ApolloProvider client={client}>
        <Header /> 
        
        <div className="ban">
            <div>
              <h4 className="ban--heading">
                All Products
              </h4>
              <p className="ban--sub">
                A 360 look at Lumin
              </p>
            </div>
            <div>
              <div className="ban--filter">
                Filter By
              </div>
            </div>
        </div>       
        <Products />
    </ApolloProvider>
  );
}

export default App;
