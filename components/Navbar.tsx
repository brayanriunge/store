import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { FaShoppingCart, FaStoreAlt } from "react-icons/fa";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function Navbar() {
  const flexBetween = "flex justify-between items-center";
  const isAboveMediaScreens = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  return (
    <div
      className={`${flexBetween} fixed top-0 py-6 shadow bg-cyan-400 w-full z-30`}
    >
      <div className={`${flexBetween} mx-auto 5/6`}>
        <div className={`${flexBetween} gap-60 w-full `}>
          {/* on the left */}
          <div className="p-2 ">
            <Link href={"/"} className="flex justify-start items-center gap-4 ">
              {/* <Image
                src={Logo}
                alt="logo"
                height={20}
                width={60}
                className="rounded-full justify-items-start"
              /> */}
              <FaStoreAlt className="h-8 w-8" />
              <h1 className="text-2xl bold ">EpicStore</h1>
            </Link>
          </div>

          {/* on the right */}
          {isAboveMediaScreens ? (
            <div className={`${flexBetween} w-full gap-14`}>
              <div className={`${flexBetween} text-lg  p-4  gap-8`}>
                <Link legacyBehavior href={"/"}>
                  <a className="text-lg"> Home</a>
                </Link>
                <Link legacyBehavior href={"/cart"}>
                  <a className="text-lg flex items-center gap-2">
                    Cart
                    <span>
                      <FaShoppingCart />
                    </span>
                  </a>
                </Link>

                <Link legacyBehavior href={"/contactus"}>
                  <a className="text-lg">Contact Us</a>
                </Link>
                <Link legacyBehavior href={"/aboutus"}>
                  <a className="text-lg">About us</a>
                </Link>
              </div>
              <div className="p-2">
                <button className="bg-orange-600  px-8 p-2 rounded-lg">
                  Login
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <HiMenu className=" h-6 w-6" />
            </button>
          )}
          {!isAboveMediaScreens && isMenuToggled && (
            <div className="right-0 bottom-0 fixed h-full bg-cyan-400  w-[330px] shadow-xl">
              <div className="flex justify-end mt-4 ">
                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                  <HiOutlineX className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-8 text-xl items-center justify-content">
                <Link legacyBehavior href={"/"}>
                  <a className="text-lg"> Home</a>
                </Link>
                <Link legacyBehavior href={"/cart"}>
                  <a className="text-lg flex items-center gap-2">
                    Cart
                    <span>
                      <FaShoppingCart />
                    </span>
                  </a>
                </Link>

                <Link legacyBehavior href={"/contactus"}>
                  <a className="text-lg">Contact Us</a>
                </Link>
                <Link legacyBehavior href={"/aboutus"}>
                  <a className="text-lg">About us</a>
                </Link>
                <div className="p-2">
                  <button className="bg-orange-600  px-8 p-2 rounded-lg">
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
