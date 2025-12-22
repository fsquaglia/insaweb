import { FaInstagram, FaFacebook } from "react-icons/fa";

//Llamar el componente de esta forma:
//<SocialIconLarge social="instagram" handle="@tuinstagram" socialUrl="https://instagram.com/..." />
//<SocialIconLarge social="facebook" handle="Tu Página" socialUrl="https://facebook.com/..." />

export default function SocialIconLarge({
  social = "instagram",
  handle = "",
  socialUrl = "#",
}) {
  const getSocialIcon = () => {
    switch (social) {
      case "instagram":
        return <FaInstagram className="text-3xl" />;
      case "facebook":
        return <FaFacebook className="text-3xl" />;
      default:
        return null;
    }
  };

  const getGradient = () => {
    switch (social) {
      case "instagram":
        return "bg-gradient-to-tr from-fuchsia-700 via-red-500 to-yellow-400";
      case "facebook":
        return "bg-gradient-to-tr from-blue-600 to-blue-400";
      default:
        return "bg-gray-400";
    }
  };

  const displayText = handle || `@${social}`;

  return (
    <div className="cursor-pointer flex items-center justify-center m-2 text-white hover:scale-105 transition-transform">
      <div className="w-44 h-12 flex items-center justify-center rounded-l-2xl bg-fuchsia-700 text-sm font-medium">
        {socialUrl ? (
          <a href={socialUrl} target="_blank" rel="noopener noreferrer">
            {displayText}
          </a>
        ) : (
          displayText
        )}
      </div>
      <div
        className={`flex items-center justify-center h-12 w-12 ${getGradient()} rounded-r-2xl`}
      >
        {getSocialIcon()}
      </div>
    </div>
  );
}
