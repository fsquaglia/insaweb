import Link from "next/link";

function SidebarUserLink({ href, icon, label }) {
  const LinkIcon = icon;
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
    >
      <LinkIcon className="w-6 h-6 fill-current inline-block mx-2 md:mx-0 md:mr-2" />
      <span className="hidden md:block">{label}</span>
    </Link>
  );
}
export default SidebarUserLink;
