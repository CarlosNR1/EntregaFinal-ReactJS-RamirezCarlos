
import { useState, useEffect } from "react"
import { getDocs, collection, query, where, updateDoc } from "firebase/firestore"

import { db } from "../../services/config"

const Inventario = () => {
    const [inventario, setInventario] = useState ([]);

    useEffect( ()=>{

        const misInventario = query(collection(db, "invetario"), where("precio", "<", 600))


        getDocs(misInventario)
           .then(respuesta =>{
            setInventario(respuesta.docs.map((doc) => ({id: doc.id, ...doc.data()})))

           })
    },[])

    const descontarStock = async () => {
        const invetarioRef = doc(db,"inventario",inventario.id);
        const nuevoStock = inventario.stock - 1;

        await updateDoc( invetarioRef, {stock: nuevoStock});
    }

    return (
        <>
            <h2>Inventario</h2>
            <div className="inventario-conteiner">
                {
                    inventario.map(inventario => (
                        <div className="inventario-card" key={inventario.id}>
                        <h2> {inventario.nombre} </h2>
                        <p> Precio: $ {inventario.precio}</p>
                        <p> Stock:  {inventario.stock}</p>
                        <button onClick={()=> descontarStock(inventario)}> comprar </button>
                    </div>
                    ))
                }

            </div>
        </>
    )
}

export default Inventario