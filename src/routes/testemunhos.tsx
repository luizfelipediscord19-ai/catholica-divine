import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Contêiner dos testemunhos: /testemunhos e /testemunhos/$slug. */
export const Route = createFileRoute("/testemunhos")({
  component: () => <Outlet />,
});
