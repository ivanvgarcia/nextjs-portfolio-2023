import { Navbar, Footer } from "flowbite-react";
import React, { ReactNode } from "react";
import { Manrope } from "@next/font/google";
import Image from "next/image";
import SideMenu from "./SideMenu";

const manrope = Manrope({
  subsets: ["latin"],
});

interface Props {
  children?: ReactNode;
}

export default function Home({ children }: Props) {
  return (
    <>
      <Navbar className="hidden lg:block">
        <Navbar.Brand href="/">
          <Image
            src="/logos/red-white.svg"
            alt="Ivan Logo"
            width={32}
            height={32}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/blog">Blog</Navbar.Link>
          <Navbar.Link href="/portfolio">Portfolio</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <div className="block lg:hidden">
        <SideMenu />
      </div>

      <main className={manrope.className}>{children}</main>

      <Footer container={true}>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              href="/"
              src="/logos/red-white.svg"
              alt="Ivan Garcia Logo"
              name="Ivan Garcia"
            />
            <Footer.LinkGroup className="justify-between">
              <Footer.Link href="/">Home</Footer.Link>
              <Footer.Link href="/blog">Blog</Footer.Link>
              <Footer.Link href="/portfolio">Portfolio</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright
            href="/"
            by="Ivan Garcia"
            year={new Date().getFullYear()}
          />
        </div>
      </Footer>
    </>
  );
}
