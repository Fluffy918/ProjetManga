// import Main from "./components/Main"
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom"
import Chapitres from "./components/Chapitres"
import Main from "./components/Main"
import Annuaire from "./components/Annuaire"
import DerniersChapitres from "./components/DerniersChapitres"



function App() {

  return (
      <Routes>
        <Route path="/mangas" element={<Main/>}/>
        <Route path="/mangas/:mangaId" element={<Chapitres/>}/>
        <Route path="/mangas/annuaire" element={<Annuaire/>}/>
        <Route path="/mangas/dernier" element={<DerniersChapitres/>}/>
      </Routes>
  )
}

export default App
