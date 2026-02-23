import ContactUs from "./ContactUs";
import MapCommerce from "./MapCommerceRafaela";
import InfoContact from "./InfoContact";

export default function Contact({ medios, ubicacion, showMap }) {
  const { cel = "543408674244" } = medios || {};
  const {
    direccion = "Ubicación",
    localidad = "Localidad",
    provincia = "Provincia",
  } = ubicacion || {};
  const whatsappNicolas = process.env.NEXT_PUBLIC_PHONE_NICO;
  const whatsappMarcelo = process.env.NEXT_PUBLIC_PHONE_MARCELO;

  const whatsappMessage = encodeURIComponent(
    "Hola! me gustaría hacerles una consulta. Por favor, contáctenme.",
  );
  const whatsappLinkNicolas = `https://wa.me/${whatsappNicolas}?text=${whatsappMessage}`;
  const whatsappLinkMarcelo = `https://wa.me/${whatsappMarcelo}?text=${whatsappMessage}`;

  return (
    <div>
      <div className="h-32"></div>
      <div className="xl:container mx-auto block sm:relative">
        {/* Mapa de fondo */}
        <div>{showMap && <MapCommerce />}</div>

        {/* Contenido superpuesto */}
        <div className="flex flex-col sm:flex-row block sm:absolute right-0 sm:right-5 2xl:right-10 sm:top-10 w-full sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="sm:w-3/5">
            {/* Formulario de contacto */}
            <ContactUs />
          </div>
          {/* Datos de contacto */}
          <div className="sm:w-2/5">
            <InfoContact
              direccion={direccion}
              localidad={localidad}
              provincia={provincia}
              whatsappLink1={whatsappLinkNicolas}
              whatsappLink2={whatsappLinkMarcelo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
