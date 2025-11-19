import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PlaylistProvider } from "@/context/PlaylistContext.tsx";

const RootLayout = () => (
  <PlaylistProvider>
    <Outlet />
    <TanStackRouterDevtools />
  </PlaylistProvider>
);

export const Route = createRootRoute({ component: RootLayout });
