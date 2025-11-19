import { createFileRoute } from "@tanstack/react-router";
import { HeaderPlaylist } from "@/components/features/HeaderPlaylist.tsx";

export const Route = createFileRoute("/playlist/")({
  component: HeaderPlaylist,
});
