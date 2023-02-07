import { motion } from "framer-motion";
import MenuItem from "@/components/MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
  },
];

export default function Navigation() {
  return (
    <motion.ul variants={variants}>
      {links.map((link) => (
        <MenuItem key={link.href} link={link} />
      ))}
    </motion.ul>
  );
}
