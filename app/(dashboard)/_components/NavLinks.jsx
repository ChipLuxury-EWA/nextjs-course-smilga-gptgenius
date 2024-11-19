import Link from "next/link";

const links = [
  // { label: "Chat", href: "/chat" },
  { label: "New tour", href: "/tours/new-tour" },
  { label: "Tours", href: "/tours" },
  { label: "Profile", href: "/profile" },
];

const DynamicLinksList = () => {
  return links.map((link) => {
    return (
      <li key={link.href}>
        <Link href={link.href}>{link.label}</Link>
      </li>
    );
  });
};

const NavLinks = () => {
  return (
    <ul className="menu text-base-content">
      <DynamicLinksList />
    </ul>
  );
};
export default NavLinks;
