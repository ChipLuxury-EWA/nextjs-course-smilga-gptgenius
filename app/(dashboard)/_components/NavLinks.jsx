import Link from "next/link";

const links = [
  { label: "Profile", href: "/profile" },
  { label: "Tours", href: "/tours" },
  { label: "New tour", href: "/tours/new-tour" },
  { label: "Chat", href: "/chat" },
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
