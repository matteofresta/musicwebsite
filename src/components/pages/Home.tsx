import { Navbar } from "@/components/features/Navbar.tsx";
import { Player } from "@/components/features/Player.tsx";
import { Header } from "@/components/features/Header.tsx";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Player />
    </>
  );
};
