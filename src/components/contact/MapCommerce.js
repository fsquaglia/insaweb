const MapCommerce = () => {
  return (
    <div className="w-full h-[600px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1469.726492908473!2d-61.497530019453976!3d-31.252284926525704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95caae3a2d1ff975%3A0xdb6d70e3f6497ea5!2sBv.%20Presidente%20Julio%20A.%20Roca%20455%2C%20S2300GEA%20Rafaela%2C%20Santa%20Fe!5e1!3m2!1ses!2sar!4v1745501167645!5m2!1ses!2sar"
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapCommerce;
