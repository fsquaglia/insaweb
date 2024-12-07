export default function PendingCard({ amount, dataExpire }) {
  let fechaFormateada = "";
  const isPositive = amount > 0;
  const fechaActual = new Date();
  let textoSaldo = isPositive
    ? "Tienes un saldo de:"
    : "Tienes un saldo a favor de:";
  let venceTexto = "";

  // Formato de la cantidad en moneda
  const formattedAmount = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "ARG", // Cambia "EUR" por tu moneda si lo necesitas
  }).format(Math.abs(amount));

  // Verificar la fecha de vencimiento si hay saldo pendiente
  if (isPositive && dataExpire && dataExpire.seconds) {
    const fechaVence = new Date(dataExpire.seconds * 1000);
    const opcionesFormato = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    fechaFormateada = fechaVence.toLocaleDateString("es-ES", opcionesFormato);

    venceTexto =
      fechaVence > fechaActual
        ? `Tu saldo vence el ${fechaFormateada}`
        : `Tu saldo venció el ${fechaFormateada}`;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center h-fit gap-2 p-4 w-full ${
        isPositive ? "bg-purple-50" : "bg-sky-50"
      }`}
    >
      <div className="flex flex-col items-center">
        <span className="text-gray-600">{textoSaldo}</span>
        <span
          className={`text-3xl font-bold ${
            isPositive ? "text-red-500" : "text-green-500"
          }`}
        >
          {`$ ${formattedAmount}`}
        </span>
      </div>
      {isPositive && (
        <span className="text-md text-gray-500">{venceTexto}</span>
      )}
      <span className="text-xs text-gray-400">
        Los saldos en cuenta deben cancelarse en efectivo.
      </span>
    </div>
  );
}
