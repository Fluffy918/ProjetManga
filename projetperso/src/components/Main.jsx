import React from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import MangaList from "./MangasList";
import '../style.css'


function Main() {
    return(
        <div>
            <Nav/>
            <br />
            <br />
            <br />
            <Menu/>
            <MangaList/>
        </div>
    )
}

export default Main