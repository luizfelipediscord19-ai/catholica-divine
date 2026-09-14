import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  PageHero,
  Section,
  CardGrid,
  ContentCard,
  Prose,
  Sources,
  Pullquote,
} from "../components/PageShell";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/oracoes/novenas/")({
  component: Outlet,
});
