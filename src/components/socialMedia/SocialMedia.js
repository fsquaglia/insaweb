import SocialIconLarge from "@/ui/SocialIconLarge";

export default function SocialMedia({ socialMedia }) {
  const facebook1 = socialMedia?.facebook1 || "";
  const facebook2 = socialMedia?.facebook2 || "";
  const instagram1 = socialMedia?.instagram1 || "";
  const instagram2 = socialMedia?.instagram2 || "";
  const tituloSocialMedia = socialMedia?.tituloSocialMedia || "Síguenos...";
  const imagenFondoSocialMedia = socialMedia?.imagenFondoSocialMedia || "";

  return (
    <div className="w-full text-center flex flex-col">
      <div className="h-24"></div>
      <section
        className="flex flex-col w-full h-[400px] sm:h-[500px] bg-cover bg-fixed bg-center justify-center items-center relative"
        style={
          imagenFondoSocialMedia
            ? {
                backgroundImage: `url(${imagenFondoSocialMedia})`,
              }
            : {}
        }
      >
        {/* Pseudo-elemento para la opacidad solo del fondo */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* div central - con z-index para estar encima de la opacidad */}
        <div className="flex bg-slate-100 bg-opacity-90 w-9/12 md:w-5/12 lg:w-3/12 h-[500px] items-center justify-center relative z-10">
          <div>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-gray-80 text-3xl font-semibold my-4">
              {tituloSocialMedia}
            </p>
            <div className="flex flex-wrap justify-center">
              {facebook1 && (
                <SocialIconLarge
                  social="facebook"
                  handle="Tu Página"
                  socialUrl=""
                />
              )}
              {facebook2 && (
                <SocialIconLarge
                  social="facebook"
                  handle="Tu Página"
                  socialUrl=""
                />
              )}
              {instagram1 && (
                <SocialIconLarge
                  social="instagram"
                  handle="@insa.rafaela"
                  socialUrl={instagram1}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
