import { RouterProvider } from "@tanstack/solid-router";
import { render } from "solid-js/web";
import { router } from "./app";
import { initTheme } from "./lib/theme";
import "./index.css";
import "virtual:uno.css";

initTheme();

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
render(() => <RouterProvider router={router} />, root);
