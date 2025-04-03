// import Main from "./components/Main"
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom"
import MangaList from "./components/MangasList"
import Chapitres from "./components/Chapitres"
import Main from "./components/Main"
import Nav from "./components/Nav"


function App() {

  return (
      <Routes>
        <Route path="/mangas" element={<Main/>}/>
        <Route path="/mangas/:mangaId" element={<Chapitres/>}/>
      </Routes>
  )
}

export default App
