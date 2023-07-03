import {useNavigate, useParams} from "react-router-dom";
import {NavMenu} from "../Components/NavMenu";

export function DetailsRepair()
{
    let{id}=useParams()
    const navigate=useNavigate()
    return(
        <>
            <NavMenu/>
            Szczegoly
        </>
    )
}