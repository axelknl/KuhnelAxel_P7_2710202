import React from "react";

const Searchbar = () => {
    return (
        <div className="searchbar">
            <div className="searchbar__logo">
                <img src="./img/icon/loupe.png" alt="searchLogo"/>
            </div>
            <input placeholder="Rechercher un collègue" type="text" id="searchtext" name="searchtext" className="searchbar__input"></input>
        </div>
    )
}

export default Searchbar;