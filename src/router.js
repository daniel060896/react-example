import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Search from "./routes/search/Search";
import Home from "./routes/home/Home";
import { searchLoader } from "./routes/search/searchLoader";
import { homeLoader } from "./routes/home/homeLoader";

const router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    element: <Home />,
  },
  {
    path: "/tag/:tag",
    loader: searchLoader,
    element: <Search />,
  },
]);

export default router;
