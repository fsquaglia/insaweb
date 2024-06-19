import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default async function SocialMedia({ socialMedia }) {
  return (
    <div className="w-full text-center flex flex-col">
      <div className="h-24"></div>
      <section
        className="flex flex-col w-full h-[500px] bg-cover bg-fixed bg-center justify-center items-center"
        style={{
          backgroundImage: `url(${socialMedia.imagenFondoSocialMedia})`,
        }}
      >
        {/*div central */}
        <div className="flex bg-slate-100 bg-opacity-90 w-3/12 h-[500px] items-center justify-center">
          <div>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-gray-80 text-3xl font-semibold my-4">
              {socialMedia.tituloSocialMedia}
            </p>
            <div className="flex flex-wrap justify-center">
              {socialMedia.facebook1 && (
                <span>
                  <a
                    href={socialMedia.facebook1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-2xl m-4" />
                  </a>
                </span>
              )}
              {socialMedia.facebook2 && (
                <span>
                  <a
                    href={socialMedia.facebook2}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-2xl m-4" />
                  </a>
                </span>
              )}
              {socialMedia.instagram1 && (
                <span>
                  <a
                    href={socialMedia.instagram1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-2xl m-4" />
                  </a>
                </span>
              )}
              {socialMedia.instagram2 && (
                <span>
                  <a
                    href={socialMedia.instagram2}
                    target="_blank"
                    rel="noopener noreferrer"
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
