import {NavMenu} from "../Components/NavMenu";
import "../Css/Magazine.css"
export function Magazine()
{
    return(
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