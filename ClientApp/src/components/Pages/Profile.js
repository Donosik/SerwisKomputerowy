import {NavMenu} from "../Components/NavMenu";
import "../Css/Profile.css"
export function Profile()
{
    return(
        <>
            <NavMenu />
            <p className='services-title'> JESTEŚ ZALOGOWAY JAKO: </p>
            <div className="profile-frame">
                <div className="profile-info">
                    <p className="color1">IMIĘ: John</p>
                    <p className="color2">NAZWISKO: Doe</p>
                    <p className="color3">ROLA: Administrator</p>
                    <p className="color2">Ilość napraw: 6</p>
                </div>
            </div>
        </>
    );
}