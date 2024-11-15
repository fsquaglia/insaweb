import ContactUs from "./ContactUs";
import MapCommerce from "./MapCommerce";
import InfoContact from "./InfoContact";

export default function Contact({ medios, ubicacion, showMap }) {
  const { cel = "543408674244" } = medios || {};
  const {
    direccion = "Ubicación",
    localidad = "Localidad",
    provincia = "Provincia",
  } = ubicacion || {};

  const whatsappMessage = encodeURIComponent(
    "Hola! me gustaría hacerles una consulta"
  );
  const whatsappLink = `https://wa.me/${cel}?text=${whatsappMessage}`;

  return (
    <div>
      <div className="h-24"></div>
      <div className="container mx-auto py-8 flex flex-col relative">
        {/* Mapa de fondo */}
        {showMap && (
          <div className="absolute inset-0 z-0">
            <MapCommerce />
          </div>
        )}

        {/* Contenido superpuesto */}
        <div className="relative z-10">
          <section className="relative flex justify-end">
            <div className="md:w-2/3 lg:w-1/2 xl:w-2/5 flex flex-wrap p-4 my-12 bg-white bg-opacity-90 rounded-lg shadow-lg">
              {/* Formulario de contacto */}
              <ContactUs />

              {/* Datos de contacto */}
              <div className="relative flex flex-col z-10 md:w-1/3 w-2/4 mx-auto justify-start overflow-hidden">
                <InfoContact
                  direccion={direccion}
                  localidad={localidad}
                  provincia={provincia}
                  whatsappLink={whatsappLink}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
