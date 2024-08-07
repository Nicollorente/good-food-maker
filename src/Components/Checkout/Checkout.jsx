import { useContext, useState } from 'react'
import { FormControl,FormLabel,Input,FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import "./Checkout.css"
import { Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CartContext } from '../../Context/CartContext'
import {collection,addDoc} from "firebase/firestore"
import { db } from '../../fireStore/Config'
import Swal from 'sweetalert2'


const Checkout = () => { 

  const [pedidoId,setPedidoId]=useState("")
  const {cart,cantidadTotalCarrito,vaciarCarrito}=useContext(CartContext)
const {register,handleSubmit,formState:{errors}} = useForm();


  const  comprar = (data)=> {
const pedido ={
cliente: data,
productos:cart,
total:cantidadTotalCarrito(),
}
console.log(pedido);

const pedidosRef=collection(db,"pedidos")
addDoc (pedidosRef,pedido)
.then((doc)=>{
setPedidoId(doc.id)
vaciarCarrito()
})
  }


if(pedidoId){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Compra Exitosa',
    showConfirmButton: false,
    timer: 1500
  })
return(
  <div className='numOrden'>
    <h1>Tu numero de orden es: {pedidoId}</h1>
  </div>
  )
}  
  
  return (
    
    <form className='checkout' onSubmit={handleSubmit((comprar))}  >
      
    <FormControl isInvalid={errors.Nombre}>
  <FormLabel>Nombre y Apellido</FormLabel>
  <Input type='text' {...register("Nombre",{required:"Nombre Y Apellido son requeridos"})} />
  {errors.Nombre && <FormErrorMessage> {errors.Nombre.message}</FormErrorMessage>}
</FormControl>

<FormControl isInvalid={errors.Email}>
  <FormLabel >Email </FormLabel>
  <Input type='e-mail' {...register("Email",{required:"Su email es requerido"})} />
  {errors.Email && <FormErrorMessage>{errors.Email.message}</FormErrorMessage>}
  <FormHelperText>Ingrese su email para enviar una notificacion de su pedido</FormHelperText>
</FormControl>

<FormControl isInvalid={errors.Contacto}>
  <FormLabel>Contacto</FormLabel>
  <Input type='number' {...register("Contacto",{required:"Su contacto es requerido"})} />
  {errors.Contacto && <FormErrorMessage>{errors.Contacto.message}</FormErrorMessage>}
  <FormHelperText></FormHelperText>
</FormControl>

<div className='button' >
<Button variant="solid" colorScheme="green" type='submit' >
  Enviar
</Button>
</div>
    </form>
    
  )
}

export default Checkout