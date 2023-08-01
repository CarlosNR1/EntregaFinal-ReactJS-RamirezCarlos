import { useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import {getDoc, doc} from "firebase/firestore";
import { db } from '../../services/config';

const ItemDetailContainer = () => {
    const [inventario, setInventario] = useState(null);
    const { idItem } = useParams();

    useEffect( ()=> {
        const nuevoDoc = doc(db, "inventario", idItem);

        getDoc(nuevoDoc)
            .then(res => {
                const data = res.data();
                const nuevoInventario = {id:res.id, ...data};
                setInventario(nuevoInventario);
            })
            .catch(error => console.log(error))
    }, [idItem])

    return (
        <div>
            <ItemDetail {...inventario} />
        </div>
    )
}

export default ItemDetailContainer