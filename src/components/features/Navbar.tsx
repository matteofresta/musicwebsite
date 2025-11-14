import { Button } from "../ui/button";
import Hamburger from "hamburger-react";
import { motion } from "motion/react";
import { useState } from "react";
import { X, Search } from "lucide-react";
export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="flex justify-between items-center p-4 w-full h-24 shadow-md"
      >
        <div>
          <img src="" alt="" />
        </div>
        <ul className="hidden md:flex gap-6 items-center list-none">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Discover new music</a>
          </li>
        </ul>

        <div className="relative w-80">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />
          <input
            type="text"
            placeholder="Nach Song, Alben oder Künstler Suchen..."
            className="bg-gray-500/50 rounded-lg p-2 h-10 text-sm border-none w-full pr-10 placeholder:text-sm"
          />
        </div>

        <div className="hidden md:flex gap-3">
          <Button className="h-10">Login</Button>
          <Button className="h-10">Sign up</Button>
        </div>
        <motion.div className="visible md:hidden duration-300">
          {!isOpen ? (
            <Hamburger toggled={isOpen} toggle={setOpen} />
          ) : (
            <motion.div className="flex duration-300 gap-4 w-full h-screen justify-center fixed top-0 left-0 bg-white z-50">
              <motion.div className="absolute top-1/3 flex flex-col gap-4">
                <ul>
                  <li className="flex flex-col items-center gap-4 list-none mb-10">
                    <a className="text-bold text-2xl" href="">
                      Home
                    </a>
                    <a className="text-bold text-2xl" href="">
                      Discover new music
                    </a>
                  </li>
                </ul>
                <Button className="cursor-pointer w-80 h-10">Login</Button>
                <Button className="cursor-pointer w-80 h-10">Sign up</Button>
              </motion.div>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360, transition: { duration: 0.5 } }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                className="absolute top-6 right-4"
              >
                <X
                  className="cursor-pointer"
                  size={42}
                  onClick={() => setOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};
