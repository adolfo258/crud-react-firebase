import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {db} from '../firebase'


const Form = styled.form`
    background-color: #34495E;
    width: 100%;
    border-radius: 5px;
    padding:20px;

    .form__group{
        font-size: 40px;
        display:flex;
        justify-content:space-between;
        padding:10px;
    }

    .form__input{
        height:45px;
        width: 100%;
        padding-left: 5px;
        font-size: 18px;
    }
`

const Button = styled.button`
    display:block;
    padding: 10px;
    background-color: #E67E22;
    color: #fff;
    border: none;
    font-size: 18px;
    cursor: pointer;
    max-width:200px;
    min-width:150px;
    margin: 0 auto;
    
`

const ProcutForm = ({addOrEdit, currentId, products}) => {

    const [values, setValues] = useState({
        price:'',
        name:'',
        description:'',
        time:''
    })
    
    //Toma los valores cada vez que hay un cambio en los inputs y actualiza el estado con ellos.
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value, time:new Date(  )})
    }

    //Al hacer submit ejecuto funcion para agregar valores de los inputs a la base de datos y despues receteo los valores de los input para resetear el formulario.
    const handleSubmit = async (e) => {
        e.preventDefault()

        await addOrEdit(values)

        setValues({...values, 
            price:'',
            name:'',
            description:''
        })
    }
    //cuando hay un cambio en el currentId se dispara, si hay currentId entonces hace una peticion a firebase con los datos de esa id, sino deja los valores a ''.
    useEffect(() => {
        if(currentId === ''){
            setValues({
                price:'',
                name:'',
                description:'',
                time:''
            })
        }else{
          db.collection('Products').doc(currentId).get().then((doc) => {
            setValues(doc.data())
            alert('Escribe los nuevos valores del producto!')
          })
             
           
        }
    },[currentId])

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form__group">
                    <input className="form__input" 
                    placeholder="Nombre del producto" 
                    name="name" 
                    type="text"
                    required
                    onChange={handleInputChange}
                    value={values.name}
                    >
                    </input>
                </div>

                <div className="form__group">
                    <input className="form__input" 
                    placeholder="Precio $" 
                    name="price" 
                    type="number"
                    required
                    onChange={handleInputChange}
                    value={values.price}
                    >
                    </input>
                </div>

                <div className="form__group">
                    <input className="form__input" 
                    placeholder="Escribe una descripcion." 
                    name="description" 
                    type="text"
                    required 
                    onChange={handleInputChange}
                    value={values.description}
                    >
                    </input>
                </div>
                <Button type="submit">{currentId ? 'Update' : 'Enviar'}</Button>
            </Form>  
        </>
    )
}

export default ProcutForm