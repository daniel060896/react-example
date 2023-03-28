import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import Search from "./routes/search/Search";
import Home from "./routes/home/Home";
import { searchLoader } from "./routes/search/searchLoader";
import { homeLoader } from "./routes/home/homeLoader";
const container = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    element: <Home />,
  },
  {
    path: "/search",
    loader: searchLoader,
    element: <Search />,
  },
]);

export default router;
