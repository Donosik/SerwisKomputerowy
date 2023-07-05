import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { jsPDF } from "jspdf";
import { NavMenu } from "../Components/NavMenu";
import "jspdf-autotable";

export function RepairRow({ repair, removeFromData }) {
    const [inputs, setInputs] = useState({})

    let { id } = useParams()
    const navigate = useNavigate()
    const [repairData, setRepairData] = useState()
    const [workers, setWorkers] = useState([])
    const [parts, setParts] = useState([])
    const [actions, setActions] = useState([])

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }
    async function getRepair() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/repair/' + id)
        setRepairData(result.data)
    }

    async function getWorkers() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/worker/repair/' + id)
        setWorkers(result.data)
    }
    async function getPart() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/part/repair' + id)
        setParts(result.data)
    }

    async function getAction() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/action/repair' + id)
        setActions(result.data)
    }
    useEffect(() => {
        getRepair()
        getWorkers()
        getPart()
        getAction()
    }, [])

    const handleDownloadInvoicePDF = () => {
        const doc = new jsPDF();

        const partsData = parts.map((part) => [
            part  ? part.partName : '',
            part  ? part.serialNumber : '',
            part  ? part.cost : '',
            part  ? part.costOfWork : '',
            part  ? part.cost + part.costOfWork : '',
            
        ]);
        const priceData = parts.map((part) => [
            parts ? parts.map(part => part.cost).reduce((cost, sum) => cost + sum) + parts.map(part => part.costOfWork).reduce((costOfWork, sum) => costOfWork + sum) : ''
        ]);

        doc.autoTable({
            head: [
                [ "Nazwa czesci","Numer Seryjny czesci", "Cena czesci", "Cena naprawy"],
            ],
            body: partsData,
        });
        doc.autoTable({
            head: [
                ["Razem"],
            ],
            body: priceData,
        });

        doc.save("Faktura.pdf");
    };
    function editElement() {
        navigate('/naprawy/edycja/' + repair.id)
    }

    function detailsElement()
    {
        navigate('/naprawy/szczegoly/'+repair.id)
    }
    
    async function deleteElement() {
        setAuthToken(localStorage.getItem("token"))
        await axios.delete('/repair/' + repair.id)
        removeFromData(repair.id)
    }

    let status = () => {
        return repair.status
    }

    function castToString(status) {
        if (status === 0) {
            return 'skonczone'
        } else if (status === 1) {
            return 'przyjete'
        }
        //TODO: dorobic statusy
        // Pamietac ze na backendzie tez sa te wartosci
    }

    return (
        <tr>
            <td>{repair.id}</td>
            <td>{castToString(repair.status)}</td>
            <td>{repair.client.firstName ?? "-"}</td>
            <td>{repair.client.lastName ?? "-"}</td>
            <td>{repair.equipment.name ?? "-"}</td>
            <td>
                {localStorage.getItem("role") > 0 &&
                    <button className='button-class' onClick={editElement}>EDYTUJ</button>}
                <button className='button-class' onClick={detailsElement} >SZCZEGÓŁY</button>
                {localStorage.getItem("role") > 0 && <button className='button-class' onClick={handleDownloadInvoicePDF}>FAKTURA PDF</button>}
                {localStorage.getItem("role") > 0 &&
                    <button className='button-class' onClick={deleteElement}>USUŃ</button>}
            </td>
        </tr>
    )
}