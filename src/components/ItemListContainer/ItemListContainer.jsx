import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'

import { useParams } from 'react-router-dom'

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/config';


const ItemListContainer = () => {
    const [inventario, setInventario] = useState([]);
    const { idCategoria } = useParams();

    useEffect( () => {
        const misInventario = idCategoria ? query(collection(db, "inventario"),where("idCat", "==", idCategoria)) : collection(db, "inventario");

        getDocs(misInventario)
            .then( res => {
                const nuevosInventario = res.docs.map( doc => {
                    const data = doc.data();
                    return {id: doc.id, ...data}
                })
                setInventario(nuevosInventario);
            })
            .catch(error => console.log(error))
    }, [idCategoria])


    return (
        <>
            <h2 style={{ textAlign: "center" }}> Mi Inventario </h2>
            <ItemList inventario={inventario} />
        </>
    )
}

export default ItemListContainer