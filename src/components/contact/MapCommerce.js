const MapCommerce = () => {
  return (
    <div className="w-full h-[600px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d672.002995576481!2d-61.243441621031195!3d-30.31141635712345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x944a79a50c5f6c3f%3A0xddfeb813b43d1a54!2sIhara%20%26%20London!5e1!3m2!1ses!2sar!4v1731524951528!5m2!1ses!2sar"
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapCommerce;
