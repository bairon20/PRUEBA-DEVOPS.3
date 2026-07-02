import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { API_VENTAS_URL } from "../../config/api";

export const FormVenta = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      direccionCompra: data.direccionCompra,
      valorCompra: Number(data.valorCompra),
      fechaCompra: data.fechaCompra,
      despachoGenerado: false,
    };
    const endpoint = `${API_VENTAS_URL}/api/v1/ventas`;

    // #region debug-point A:submit-request
    fetch("http://127.0.0.1:7777/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: "venta-create-error", runId: "pre-fix", hypothesisId: "A", location: "FormVenta.jsx:onSubmit:pre", msg: "[DEBUG] Sending create venta request", data: { endpoint, payload }, ts: Date.now() }) }).catch(() => {});
    // #endregion

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // #region debug-point D:submit-success
      fetch("http://127.0.0.1:7777/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: "venta-create-error", runId: "pre-fix", hypothesisId: "D", location: "FormVenta.jsx:onSubmit:success", msg: "[DEBUG] Venta created successfully", data: { endpoint, responseStatus: response?.status, responseData: response?.data }, ts: Date.now() }) }).catch(() => {});
      // #endregion

      reset();
      await Swal.fire({
        title: "Venta registrada!",
        text: "La orden de compra fue creada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      // #region debug-point E:submit-error
      fetch("http://127.0.0.1:7777/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: "venta-create-error", runId: "pre-fix", hypothesisId: "E", location: "FormVenta.jsx:onSubmit:catch", msg: "[DEBUG] Venta create request failed", data: { endpoint, message: error?.message, code: error?.code, responseStatus: error?.response?.status, responseData: error?.response?.data, requestUrl: error?.config?.url }, ts: Date.now() }) }).catch(() => {});
      // #endregion
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
