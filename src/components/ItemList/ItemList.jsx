import Item from "../Item/Item"
import './ItemList.css'

const ItemList = ({ inventario }) => {
    return (
        <div className="contenedorInventario">
            {inventario.map(prod => <Item key={prod.id} {...prod} />)}
        </div>
    )
}

export default ItemList