import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/doutrina")({
  component: () => <Outlet />,
});
