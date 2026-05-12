import type { Route } from "./+types/home";
import { Main } from "../main/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order Project" },
    { name: "description", content: "Welcome to Order Project!" },
  ];
}

export default function Home() {
  return <Main />;
}