export default function Footer() {
  return (
    <div>
      {/*franja superior*/}
      <div className="w-full bg-gray-600 h-8"></div>
      {/*línea blanca/transparente*/}
      <div className="w-full bg-transparent h-1"></div>
      {/*datos inferiores*/}
      <div className="w-full bg-gray-600 py-4">
        <div className="container mx-auto grid gap-4 grid-cols-1 sm:grid-cols-3 text-gray-200 ">
          <div className="text-left w-3/5 mx-auto">
            {/* Contenido de la primera columna */}
            <h2 className="text-lg font-semibold">Responsabilidad</h2>
            <p className="text-sm">
              Este sitio tiene un carácter informativo. No se realizan ventas a
              través del sitio, y los precios pueden variar sin previo aviso.
              Las imágenes de los productos son referenciales. Las ofertas
              aplican solo a pagos en efectivo en el local. Al navegar en este
              sitio, usted acepta nuestras políticas y condiciones de
              privacidad.
            </p>
          </div>
          <div className="text-center w-3/5 mx-auto flex flex-col justify-center items-center">
            {/* Contenido de la segunda columna */}
            <img
              src="https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/logosIharaLondon%2Flogo_blanco01.png?alt=media&token=92d797fd-31b6-42de-85d4-f93b662ab7c4"
              alt="Logo Ihara & London"
              height={"100px"}
              width={"100px"}
            />
            <h2 className="text-lg font-semibold">Ihara & London</h2>
            <p className="text-sm">Indumentaria y Calzado</p>
          </div>
          <div className="text-left w-3/5 mx-auto">
            {/* Contenido de la tercera columna */}
            <h2 className="text-lg font-semibold">Servicio al cliente</h2>
            <p className="text-sm">
              Para más información, comuníquese con nosotros a través de
              <a
                href="mailto:fernandosquaglia@gmail.com"
                className="underline mx-1"
              >
                email
              </a>
              o{" "}
              <a href="https://wa.me/5493408674244" className="underline mx-1">
                WhatsApp
              </a>
              o utilizando los datos proporcionados en la sección
              <a href="#contact" className="underline mx-1">
                Contacto
              </a>
              . Recopilamos datos de terceros únicamente para mejorar la
              experiencia de navegación en nuestro sitio. Si solicitamos
              información personal, será exclusivamente para enviarle novedades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
