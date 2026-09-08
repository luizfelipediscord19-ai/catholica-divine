import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Contêiner das páginas do Catecismo: /catecismo, /catecismo/$parte e /catecismo/artigos. */
export const Route = createFileRoute("/catecismo")({
  component: () => <Outlet />,
});
