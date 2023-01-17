import './App.css';

import { useState, useEffect } from 'react';

import { useFetch } from './hooks/useFetch';

const url = 'http://localhost:3000/products'

function App() {

  const [products, setProducts] = useState([])

  // custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // resgatando os dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url)
  //     const data = await res.json()
  //     setProducts(data)
  //   }
  //   fetchData()
  // }, [])

  // adicionando produtos
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }
    console.log('oi')
    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product)
    // })

    // // carregamento dinamico
    // const addedProduct = await res.json()
    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // refatorando produto
    httpConfig(product, 'POST')
    setName('')
    setPrice('')
  }

  const handleRemove = (id) => {
    httpConfig(id, 'DELETE')
  }


  return (
    <div className="App">
      <h1>Lista de produtos</h1>

      {/* loading  */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}

      {!loading &&  <ul>
        {items && items.map((item) => (
          <li key={item.id}>{item.name} - R$ {item.price}
          <button onClick={() => handleRemove(item.id)}>delete</button>
          </li>
          
        ))}
      </ul>}
      <div className="add_product">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" value={name} name='name' onChange={(e) => { setName(e.target.value) }} />
          </label>
          <label>
            <span>Preço:</span>
            <input type="number" value={price} price='price' onChange={(e) => { setPrice(e.target.value) }} />
          </label>

          {/* loading state on POST */}
          {!loading && <input type="submit" value='Enviar produto' />}
          {loading && <input type="submit" value='Enviar produto' disabled />}
        </form>
      </div>
    </div>
  );
}

export default App;
