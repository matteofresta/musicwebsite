import { RiPlayListFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import {Link} from "@tanstack/react-router";
export const SidebarNav = () => {
    return (
        <>
            <div className="w-32 h-screen dark:bg-(--backgroud-dark) bg-white border-gray-300 border-2 flex  justify-center">
                <div>
                    <Link to="/"><IoMdHome className="text-black dark:text-white text-5xl mt-40 cursor-pointer" /></Link>
                    <Link to="/playlist"><RiPlayListFill className="text-black dark:text-white text-5xl mt-8 cursor-pointer" /></Link>
                </div>
            </div>
        </>

    )
}
