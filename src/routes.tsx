import HomePage from "./pages/HomePage";
import { FC } from "react";
import RegisterPage from "./pages/RegisterPage";

interface RouteType {
  path: string;
  main: FC;
}

const routes: RouteType[] = [
  {
    path: "/",
    main: HomePage,
  },
  {
    path: "/register",
    main: RegisterPage,
  }
];

export default routes;