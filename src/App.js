import React from 'react';
import Product from './components/Product'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
  }

  body{
    display:flex;
    justify-content:center;
    background-color:#808B96;
  }

  h1 {
    color:#34495E;
    margin-top: 10px;
    font-size:22px;
    display:flex;
    justify-content:center;
  }

`

const ContainerForm = styled.div`
 margin:10px;
`

function App() {
  return (
    <>
    <h1>Crud con React.js y Firebase</h1>
    <GlobalStyle />
    <ContainerForm>
      <Product />
    </ContainerForm>
    </>
  );
}

export default App;
