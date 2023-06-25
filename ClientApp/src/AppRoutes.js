import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login"
import { Register } from "./components/Register";
import { Repair } from "./components/Repair";
import { EditRepair } from "./components/EditRepair"
import { Raport } from "./components/Raport"
import Chatbox from "./components/Chatbox";


const AppRoutes = [
  {
    index: true,
    element: <Login />
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
  },
  {
      path: '/naprawy/edycja/:id',
      element: <EditRepair/>
  },
  {
      path: '/chat',
      element: <Chatbox />
  },
  {
      path: '/raport',
      element: <Raport/>
  }
];

export default AppRoutes;
