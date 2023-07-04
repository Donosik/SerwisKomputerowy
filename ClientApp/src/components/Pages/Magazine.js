import {NavMenu} from "../Components/NavMenu";
import "../Css/Magazine.css"
import {useState} from "react";
import {SearchMagazine} from "../Components/SearchMagazine";
import {AddMagazine} from "../Components/AddMagazine";

export function Magazine() {
    const [renderBool, setRenderBool] = useState(true)

    function searchHandler() {
        setRenderBool(true)
    }

    function createHandler() {
        setRenderBool(false)
    }

    return (
        <>
            <NavMenu/>
            <p className='services-title'> MAGAZYN CZĘŚCI </p>
            <button className='button-add' onClick={searchHandler}>SZUKAJ</button>
            <button className='button-add' onClick={createHandler}>DODAJ</button>
            <br/><br/>
            {renderBool ? <SearchMagazine/> : <AddMagazine/>}
        </>
    );
}