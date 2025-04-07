import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import "../style.css" 




function Nav() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    function handleSearch() {
        if (searchQuery.trim()) {
            window.location.href = `/mangas?search=${encodeURIComponent(searchQuery.trim())}`
        }
    }
    
    return(
        <nav className="bg-gray-900 text-white p-4 shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2x1 font-bold">Scan VF</h1>
                
                <ul className="hidden md:flex gap-6 text-lg">
                    <li><Link to="/mangas" className="hover:text-gray-300 transition">Accueil</Link></li>
                    <li><Link to="/mangas" className="hover:text-gray-300 transition">Annuaire des Mangas</Link></li>
                    <li><Link to="/mangas" className="hover:text-gray-300 transition">Derniers chapitres</Link></li>
                </ul>

                <div className="search-container">
                    <input type="text" placeholder="Rechercher un manga..." className="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button onClick={handleSearch} className="hidden md:block hover:text-gray-300 transition">
                        <Search size={24}/>
                    </button>
                </div>
                

                <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {isOpen && (
                <ul className="md:hidden flex flex-col bg-gray-800 p-4 space-y-2">
                    <li><Link to="/" className="block py-2 hover:text-gray-300">Accueil</Link></li>
                    <li><Link to="/mangas" className="block py-2 hover:text-gray-300">Annuaire des Mangas</Link></li>
                    <li><Link to="/manga" className="block py-2 hover:text-gray-300">Derniers chapitres</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default Nav