import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { render } from "solid-js/web";
import { routeTree } from "./app";
import "./index.css";

const router = createRouter({ routeTree });

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
render(() => <RouterProvider router={router} />, root);
