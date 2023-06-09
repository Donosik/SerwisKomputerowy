import {Login} from "./components/Pages/Login"
import {Register} from "./components/Pages/Register";
import {Repair} from "./components/Pages/Repair";
import {EditRepair} from "./components/Pages/EditRepair"
import {Raport} from "./components/Pages/Raport"
import Chatbox from "./components/Pages/Chatbox";
import {Profile} from "./components/Pages/Profile";
import {Magazine} from "./components/Pages/Magazine";
import {EditUser} from "./components/Pages/EditUser";
import {DetailsRepair} from "./components/Pages/DetailsRepair";
import {EditPart} from "./components/Pages/EditPart";


const AppRoutes = [
    {
        index: true,
        element: <Login/>
    },
    {
        path: '/logowanie',
        element: <Login/>
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
        path: '/naprawy/szczegoly/:id',
        element: <DetailsRepair/>
    },
    {
        path: '/chat',
        element: <Chatbox/>
    },
    {
        path: '/raport',
        element: <Raport/>
    },
    {
        path: '/profil',
        element: <Profile/>
    },
    {
        path: '/magazyn',
        element: <Magazine/>
    },
    {
      path: '/magazyn/edycja/:id',
      element: <EditPart/>  
    },
    {
        path: '/edytuj',
        element: <EditUser/>
    }
];

export default AppRoutes;
