import React, {useEffect, useState} from 'react'
import ProcutForm from './ProductForm'
import {db} from '../firebase'
import styled from 'styled-components'

const ProductCard = styled.div`
    width: 100%;
    background-color: #34495E;
    border-radius: 5px;
    color:#fff;
    padding: 10px 20px;
    margin: 10px 0;


      .card{
         margin: 20px auto;
         border: 2px solid #85929E;
         padding: 20px;
         border-radius: 5px;
         height: 150px;
         width:  100%;
         font-size: 18px;
         display:flex;
         justify-content:space-between; 
     }

     .card__info{
        display: flex;
        flex-direction: column;
        justify-content:space-around;
     }

     .card__icons i{
         cursor:pointer;
         margin:10px;
     }

`

const Product = () => {

    const [products, setProducts] = useState([])
    const [currentId, setCurrentId] = useState('')

    //Agrega a la base de datos el objeto que le paso.
    const addOrEdit =  (productObject) => {
        if(!currentId){
            db.collection('Products').doc().set(productObject)
        } else {
            db.collection('Products').doc(currentId).update(productObject).then(() => {
                setCurrentId('')
                alert('Editado Correctamente!')
            })
        }
    }   
    //Le pido a firebase los docs en mi base de datos, los guardo en un array y luego actualizo el estado con ese array.
    const getProducts = () => {
        db.collection('Products').orderBy('time', 'desc').onSnapshot((query) => {
            const docs = []

            query.forEach((doc)=>{
                docs.push({...doc.data(), id: doc.id})
            })
            console.log(docs)
            setProducts(docs)
        })  
    }
    //Borra la card con el id que le pase.
    const deleteCard = (id) => {
        if(window.confirm('¿Estas seguro de borrar este producto?')){
            db.collection('Products').doc(id).delete()
        }
    }
    //actualiza el estado de currentId
    const getIdCard = (id) => {
        setCurrentId(id)
    }
    
    //Cada vez que hay un cambio o se renderiza algo nuevo se ejecuta.
    useEffect(() => {
        getProducts()
    },[])

    //Por cada link en el estado renderizo una card con sus valores.
   return(
    <>
        <ProcutForm addOrEdit={addOrEdit} currentId={currentId} products={products}/>
        <ProductCard>
            {products.map((link) => {
                return(
                    <div className="card" key={link.id}>
                    <div className="card__info">
                        <h2>{link.name.toUpperCase()}</h2>
                        <p>$ {link.price}</p>
                        <p>{link.description}</p>
                    </div>
                    <div className="card__icons">
                        <i className="fas fa-trash-alt" onClick={() =>deleteCard(link.id)}></i>
                        <i className="fas fa-edit" onClick={() => getIdCard(link.id)}></i>
                    </div>
                    </div>
                )
            })}
        </ProductCard>
    </>
    ) 
}

export default Product