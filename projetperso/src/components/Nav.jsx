import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import "../Nav.css" 




function Nav() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    function handleSearch() {
        if (searchQuery.trim()) {
            navigate(`/mangas?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }
    
    return(
        <nav className="nav">
            <div className="nav-container">
                <h1 className="logo">Scan VF</h1>
                
                <ul className="nav-links">
                    <li><Link to="/mangas" className="hover:text-gray-300 transition">Accueil</Link></li>
                    <li><Link to="/mangas/annuaire" className="hover:text-gray-300 transition">Annuaire des Mangas</Link></li>
                    <li><Link to="/mangas/derniers" className="hover:text-gray-300 transition">Derniers chapitres</Link></li>
                </ul>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }} className="search-container">
                    <input type="text" placeholder="Rechercher un manga..." className="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button onClick={handleSearch} className="hidden md:block hover:text-gray-300 transition">
                        <Search size={24}/>
                    </button>
                    
                </form>
                

                <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {isOpen && (
                <ul className="mobile-menu">
                    <li><Link to="/" >Accueil</Link></li>
                    <li><Link to="/mangas" >Annuaire des Mangas</Link></li>
                    <li><Link to="/manga" >Derniers chapitres</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default Nav