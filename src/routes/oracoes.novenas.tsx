import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/oracoes/novenas")({
  component: Outlet,
});
