import Filters from "./Filters"
import Headers from "./Header"
import MainGrid from "./MainGrid"
import Nav from "./Nav"
import Sidebar from "./Sidebar"
import '../Annuaire.css'

function Annuaire() {
    return(
        <>
            <Nav/>
            <br />
            <br />
            <br />
            <Headers/>
            <div className="annuaire-container">
                <div className="left-panel">
                    <Filters/>
                    <MainGrid/>
                </div>
                <Sidebar/>
            </div>
            
        </>
    )
}

export default Annuaire