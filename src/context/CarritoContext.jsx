import { useState, createContext } from "react";
export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTodal: 0
})

export const CarritoProvider = ({children}) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    console.log(carrito);

    const agregarInvetario = (item, cantidad) => {
        const inventarioExistente = carrito.find(prod => prod.item.id === item.id);

        if(!inventarioExistente) {
            setCarrito(prev => [...prev, {item, cantidad}]);
            setCantidadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad));
        } else {
            const carritoActualizado = carrito.map ( prod => {
                if(prod.item.id === item.id) {
                    return {...prod, cantidad: prod.cantidad + cantidad};
                } else {
                    return prod;
                }
            });
            setCarrito(carritoActualizado);
            setCantidadTotal(prev => prev + cantidad);
            setTotal(prev => (item.precio * cantidad));
        }
    }

    const eliminarInvetario = (id) => {
        const inventarioEliminado = carrito.find( prod => prod.item.id === id);
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id); 
        setCarrito(carritoActualizado);
        setCantidadTotal(prev => prev - inventarioEliminado.cantidad);
        setTotal(prev => prev - (inventarioEliminado.item.precio * productoEliminado.cantidad));
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
    }

    return (
        <CarritoContext.Provider value={{carrito, total, cantidadTotal, agregarInvetario, eliminarInvetario, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    )
}
