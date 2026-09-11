import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Contêiner dos Sacramentos: /sacramentos e /sacramentos/$tema. */
export const Route = createFileRoute("/sacramentos")({
  component: () => <Outlet />,
});
