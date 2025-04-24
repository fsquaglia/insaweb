import Image from "next/image";

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
            <Image
              src="/images/logo_blanco01.png"
              alt="Logo Insa Rafaela SA"
              width={96}
              height={96}
              className="size-12 sm:size-24"
            />

            <h2 className="text-lg font-semibold">Insa Rafaela S.A.</h2>
            <p className="text-sm">Servicio de calidad.</p>
          </div>
          <div className="text-left w-3/5 mx-auto">
            {/* Contenido de la tercera columna */}
            <h2 className="text-lg font-semibold">Servicio al cliente</h2>
            <p className="text-sm">
              Para más información, comuníquese con nosotros a través de
              <a
                href="mailto:insa.rafaela@gmail.com"
                className="underline mx-1"
              >
                email
              </a>
              o{" "}
              <a href="https://wa.me/5493492396683" className="underline mx-1">
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
