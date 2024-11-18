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
      <div className="h-32"></div>
      <div className="xl:container mx-auto relative">
        {/* Mapa de fondo */}
        <div>{showMap && <MapCommerce />}</div>

        {/* Contenido superpuesto */}
        <div className="flex flex-row absolute right-5 2xl:right-10 top-10 w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-3/5">
            {/* Formulario de contacto */}
            <ContactUs />
          </div>
          {/* Datos de contacto */}
          <div className="w-2/5">
            <InfoContact
              direccion={direccion}
              localidad={localidad}
              provincia={provincia}
              whatsappLink={whatsappLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
