import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormVenta = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      direccionCompra: data.direccionCompra,
      valorCompra: Number(data.valorCompra),
      fechaCompra: data.fechaCompra,
      despachoGenerado: false,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_VENTAS_URL}/api/v1/ventas`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      reset();
      await Swal.fire({
        title: "Venta registrada!",
        text: "La orden de compra fue creada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      console.error("Error creando venta:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la venta.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center text-center px-24 text-xl"
    >
      <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
        Crear orden de compra
      </div>
      <div className="mb-5">
        <label className="block font-bold mb-2">Direccion de entrega</label>
        <input
          type="text"
          placeholder="Ingresa la calle y numero"
          className="border border-gray-300 rounded-lg block w-full p-1"
          {...register("direccionCompra", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label className="block font-bold mb-2">Fecha de compra</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg block w-full p-1"
          {...register("fechaCompra", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label className="block font-bold mb-2">Valor total</label>
        <input
          type="number"
          min="1"
          placeholder="Ingresa el valor"
          className="border border-gray-300 rounded-lg block w-full p-1"
          {...register("valorCompra", { required: true, min: 1 })}
        />
      </div>
      <button
        className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14"
        type="submit"
      >
        Guardar venta
      </button>
    </form>
  );
};
