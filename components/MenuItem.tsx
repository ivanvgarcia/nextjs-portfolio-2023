import { motion } from "framer-motion";
import Link from "next/link";

const variants = {
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

interface Link {
  href: string;
  label: string;
}

interface Props {
  link: Link;
}

export default function MenuItem({ link }: Props) {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className="font-bold text-2xl text-red-700" href={link.href}>
        {link.label}
      </Link>
    </motion.li>
  );
}
