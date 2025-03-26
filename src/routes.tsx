import HomePage from "./pages/Home/HomePage";
import { FC } from "react";
import RegisterPage from "./pages/Login/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import UploadPage from "./pages/Upload" ;
import Profile from "./pages/Profile";

interface RouteType {
  path: string;
  main: FC;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "/",
    main: HomePage,
    protected: true,
  },
  {
    path: "/register",
    main: RegisterPage,
    protected: false,

  },
  {
    path: "/login",
    main: LoginPage,
    protected: false,

  },
  {
    path: "/upload",
    main: UploadPage,
    protected: true,

  },
  {
    path: "/profile",
    main: Profile,
    protected: true,

  }
];

export default routes;