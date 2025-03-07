import HomePage from "./pages/Home/HomePage";
import { FC } from "react";
import RegisterPage from "./pages/Login/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";

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
  },
  {
    path: "/login",
    main: LoginPage,
  }
];

export default routes;