import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login"
import { Register } from "./components/Register";
import { Repair } from "./components/Repair";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/logowanie',
    element: <Login />
    },
    {
        path: '/rejestracja',
        element: <Register/>
    },
  {
    path: '/naprawy',
    element: <Repair/>
  }
];

export default AppRoutes;
