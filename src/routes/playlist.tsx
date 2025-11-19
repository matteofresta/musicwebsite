import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarNav } from "@/components/features/SidebarNav.tsx";
import { Navbar } from "@/components/features/Navbar.tsx";
import { Player } from "@/components/features/Player.tsx";

function PlaylistLayout() {
  return (
    <div className="flex">
      <SidebarNav />
      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
      <Player />
    </div>
  );
}

export const Route = createFileRoute("/playlist")({
  component: PlaylistLayout,
});
