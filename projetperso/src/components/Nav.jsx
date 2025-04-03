import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import "../style.css" 

function Nav() {
    const [isOpen, setIsOpen] = useState(false)
    
    return(
        <nav className="bg-gray-900 text-white p-4 shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2x1 font-bold">Scan VF</h1>
                
                <ul className="hidden md:flex gap-6 text-lg">
                    <li><Link to="/" className="hover:text-gray-300 transition">Accueil</Link></li>
                    <li><Link to="/" className="hover:text-gray-300 transition">Annuaire des Mangas</Link></li>
                    <li><Link to="/" className="hover:text-gray-300 transition">Derniers chapitres</Link></li>
                </ul>

                <button className="hidden md:block hover:text-gray-300 transition">
                    <Search size={24}/>
                </button>

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