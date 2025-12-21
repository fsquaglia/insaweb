import { FaInstagram } from "react-icons/fa";

export default function SocialIconLarge({ social = "instagram" }) {
  switch (social) {
    case "instagram":
      social = <FaInstagram className="text-4xl m-4" />;
      break;
    default:
      social = null;
  }

  return <div className="w-40 h-12 rounded-lg border">{social}</div>;
}
