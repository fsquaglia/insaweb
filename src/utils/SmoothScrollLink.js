import Link from "next/link";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const SmoothScrollLink = ({ href, children }) => {
  // Verifica si el enlace es interno o externo
  const isInternalLink = href.startsWith("#");

  if (isInternalLink) {
    return (
      <ScrollLink to={href.substring(1)} smooth={true} duration={500}>
        {children}
      </ScrollLink>
    );
  }

  return <Link href={href}>{children}</Link>;
};

export default SmoothScrollLink;
