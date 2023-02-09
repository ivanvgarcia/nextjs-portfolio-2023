import Image from "next/image";
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

const childrenVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
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
    <motion.ul variants={variants} className="mt-72">
      <motion.div variants={childrenVariants} className="my-10">
        <Image
          src="/logos/red-white.svg"
          alt="Ivan Logo"
          width={32}
          height={32}
        />
      </motion.div>

      {links.map((link) => (
        <MenuItem key={link.href} link={link} />
      ))}
    </motion.ul>
  );
}
