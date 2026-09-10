import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Contêiner da Enciclopédia: /enciclopedia e /enciclopedia/$tema. */
export const Route = createFileRoute("/enciclopedia")({
  component: () => <Outlet />,
});
