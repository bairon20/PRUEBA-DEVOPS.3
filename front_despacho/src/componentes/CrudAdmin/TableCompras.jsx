import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import { FormVenta } from "./FormVenta";
import axios from "axios";
import { API_VENTAS_URL } from "../../config/api";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);
  const ventasDisponibles = ventas.filter((venta) => !venta.despachoGenerado);

  const compras = async () => {
    await axios.get(`${API_VENTAS_URL}/api/v1/ventas`, {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
  }
    }).then((response) => {
      console.log(response.data);
      // Asegurarnos de que sea un array
      const data = Array.isArray(response.data) ? response.data : [];
      setVentas(data);
    }).catch((error) => {
      console.error('Error fetching ventas:', error);
      setVentas([]);
    });
  };
  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    compras();
  }, []);

  //state que controla el modal
  const [openModal, setOpenModal] = useState(false);
  const [openVentaModal, setOpenVentaModal] = useState(false);

  //state que abre el modal junto con la data del id seleccionado
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
    setOpenModal(true);
  };

  return (
    <>
      <section className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => setOpenVentaModal(true)}
          className="py-3 px-8 rounded-xl bg-teal-600 text-white font-bold shadow-md hover:bg-teal-700 transition-all duration-300"
        >
          Crear venta manual
        </button>
      </section>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            <table className="table-fixed">
              <thead>
                <tr className="py-10">
                  <th className="pr-10">Orden de compra</th>
                  <th className="pr-10">direccion</th>
                  <th className="pr-10">fecha de compra</th>
                  <th className="pr-10">valor total</th>
                  <th className="pr-10"></th>
                </tr>
              </thead>
              <tbody>
                {ventasDisponibles.map((venta) => {
                    const id = venta.idVenta || venta.id;
                    return (
                      <tr key={id}>
                        <td className="pr-10 py-10 items-center">
                          {id}
                        </td>
                        <td className="pr-10 py-10  items-center">
                          {venta.direccionCompra}
                        </td>
                        <td className="pr-10 py-10  items-center">
                          {venta.fechaCompra}
                        </td>
                        <td className="pr-10 py-10  items-center">
                          ${venta.valorCompra}
                        </td>
                        <td>
                          <button
                            onClick={() => handleAbrirModal(venta)}
                            className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300 "
                          >
                            Crear Despacho AWS
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {ventasDisponibles.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-slate-500 font-semibold">
                      No hay ventas disponibles. Crea una venta manual para generar un despacho.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        {ventaSeleccionada && (
          <FormDespacho
            venta={ventaSeleccionada}
            onClose={() => {
              //onclose es un prop que pasa funciones al modal con el form abierto, por ende al cerrarse, se ejecutan esas 2 funciones
              setOpenModal(false), compras();
            }}
          />
        )}
      </Modal>
      <Modal
        onClose={() => {
          setOpenVentaModal(false);
        }}
        open={openVentaModal}
      >
        <FormVenta
          onClose={() => {
            setOpenVentaModal(false);
            compras();
          }}
        />
      </Modal>
    </>
  );
};
