"use client";
import SmoothScrollLink from "@/utils/SmoothScrollLink";

function NavLinks({ configurations }) {
  const menuItems = [
    { href: "#main", label: "Inicio", condition: true },
    { href: "#categories", label: "Categorías", condition: true },
    {
      href: "#offers",
      label: "Ofertas",
      condition: configurations?.mostrarOfertasEnHome || false,
    },
    {
      href: "#tips",
      label: "Tips",
      condition: configurations?.mostrarTipsEnHome || false,
    },
    {
      href: "#history",
      label: "Historia",
      condition: configurations?.mostrarHistoriaEnHome || false,
    },
    {
      href: "#about",
      label: "About",
      condition: configurations?.mostrarAboutEnHome || false,
    },
    {
      href: "#social-media",
      label: "Social Media",
      condition: configurations?.mostrarSocialMediaEnHome || false,
    },
    { href: "#contact", label: "Contacto", condition: true },
  ];
  return (
    <nav className="text-xs lg:text-base p-2 md:p-8">
      <ul className="flex space-x-4">
        {menuItems.map(
          (item) =>
            item.condition && (
              <li key={item.href} className="cursor-pointer hover:underline">
                <SmoothScrollLink href={item.href}>
                  {item.label}
                </SmoothScrollLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}

export default NavLinks;
