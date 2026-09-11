import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Contêiner da Apologética: /apologetica e /apologetica/$tema. */
export const Route = createFileRoute("/apologetica")({
  component: () => <Outlet />,
});
