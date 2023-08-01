
import { useState, useContext } from "react";
import { CarritoContext } from '../../context/CarritoContext';
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import './Checkout.css'

const Checkout = () => {
    const { carrito, vaciarCarrito, cantidadTotal } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [orderId, setOrdenId] = useState("");

    const manejadorFormulario = (e) => {
        e.preventDefault();


        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor completar todos los campos");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los campos del email no coinciden");
            return;
        }

        const orden = {
            items: carrito.map(inventario => ({
                id: inventario.item.id,
                nombre: inventario.item.nombre,
                cantidad: inventario.cantidad
            })),
            total: cantidadTotal,
            nombre,
            apellido,
            telefono,
            email,
            fecha: new Date()
        };

        

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const inventarioRef = doc(db, "inventario", inventarioOrden.id);
              
                const inventarioDoc = await getDoc(inventarioRef);
                const stockActual = inventarioDoc.data().stock;
            

                await updateDoc(inventarioRef, {
                    stock: stockActual - inventarioOrden.cantidad
                });
                
            })
        )
            .then(() => {
               
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        vaciarCarrito();
                    })
                    .catch((error) => {
                        console.log("Error al crear la orden", error);
                        setError("Error al crear la orden, vuelva más tarde");
                    })
            })
            .catch((error) => {
                console.log("Error al actualizar el stock.", error);
                setError("Error al actualizar el stock. Intente nuevamente");
            })

    }

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={manejadorFormulario} className="formulario">
                {carrito.map(producto => (
                    <div key={producto.id}>
                        <p>
                            {producto.item.nombre} x {producto.cantidad}
                        </p>
                        <p>Precio $ {producto.item.precio} </p>
                        <hr />
                    </div>
                ))}
                <hr />

                <div className="form-group">
                    <label htmlFor="nombre"> Nombre </label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Apellido </label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono </label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmación </label>
                    <input type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>

                {
                    error && <p style={{ color: "red" }}> {error} </p>
                }

                <button type="submit"> Finalizar Compra </button>
            </form>
            {
                orderId && (
                    <strong className="ordenId">¡Gracias por tu compra! Tu número de orden es {orderId} </strong>
                )
            }


        </div>
    )
}

export default Checkout