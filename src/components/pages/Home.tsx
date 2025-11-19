import { Navbar } from "@/components/features/Navbar.tsx";
import { Player } from "@/components/features/Player.tsx";
import { Header } from "@/components/features/Header.tsx";
import {SidebarNav} from "@/components/features/SidebarNav.tsx";

export const Home = () => {
  return (
    <>
        <div className="flex">
            <SidebarNav />
            <main className="flex-1">
                <Navbar />
                <Header />
            </main>
            <Player />
        </div>
    </>
  );
};
