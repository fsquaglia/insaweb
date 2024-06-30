import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function SocialMedia({ socialMedia }) {
  const facebook1 = socialMedia?.facebook1 || "https://www.facebook.com";
  const facebook2 = socialMedia?.facebook2 || "";
  const instagram1 = socialMedia?.instagram1 || "https://www.instagram.com";
  const instagram2 = socialMedia?.instagram2 || "";
  const tituloSocialMedia = socialMedia?.tituloSocialMedia || "Síguenos...";
  const imagenFondoSocialMedia = socialMedia?.imagenFondoSocialMedia || "";

  return (
    <div className="w-full text-center flex flex-col">
      <div className="h-24"></div>
      <section
        className={`flex flex-col w-full h-[500px] bg-cover bg-fixed bg-center justify-center items-center ${
          imagenFondoSocialMedia ? "" : "bg-default-image-class"
        }`}
        style={
          imagenFondoSocialMedia
            ? {
                backgroundImage: `url(${imagenFondoSocialMedia})`,
              }
            : {}
        }
      >
        {/* div central */}
        <div className="flex bg-slate-100 bg-opacity-90 w-1/2 md:w-5/12 lg:w-3/12 h-[500px] items-center justify-center">
          <div>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-gray-80 text-3xl font-semibold my-4">
              {tituloSocialMedia}
            </p>
            <div className="flex flex-wrap justify-center">
              {facebook1 && (
                <span>
                  <a
                    href={facebook1}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-2xl m-4" />
                  </a>
                </span>
              )}
              {facebook2 && (
                <span>
                  <a
                    href={facebook2}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-2xl m-4" />
                  </a>
                </span>
              )}
              {instagram1 && (
                <span>
                  <a
                    href={instagram1}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-2xl m-4" />
                  </a>
                </span>
              )}
              {instagram2 && (
                <span>
                  <a
                    href={instagram2}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-2xl m-4" />
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
