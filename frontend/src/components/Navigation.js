import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import addLogo from "../img/icon/add.png";
import logoutLogo from "../img/icon/logout.png";

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.userData = JSON.parse(sessionStorage.getItem("userData"));
    }

    componentDidMount() {
        const profilePic = document.getElementById("navProfilePicture");

        // Si aucun utilisateur n'est connecté on redirige vers la page Login
        if ( this.userData === null ) window.location.href = '/login'
        if ( this.userData !== null ) profilePic.style.backgroundImage = 'url(' + this.userData.profile_picture + ')';

        const uploaderContainer = document.getElementById("uploaderContainer");
        const addPost = document.getElementById("addPost");
        addPost.addEventListener('click', () => {
            uploaderContainer.style.display = "flex";
        })
    };

    logOut() {
        sessionStorage.clear();
        window.location.href = '/login';
    }

    render() {
        return (
            <div className="navigation">
                <NavLink exact to="/" className="logo-link" activeClassName="nav-active">
                    <Logo />
                </NavLink>
                <div className="iconList">
                    <div id="addPost" className="icon">
                        <div className="iconBox">
                            <img src={addLogo} alt="add"></img>
                        </div>
                    </div>
                    <div id="logOut" className="icon">
                        <div onClick={() => (this.logOut())} className="iconBox">
                            <img src={logoutLogo} alt="add"></img>
                        </div>
                    </div>
                    <a href="/account">
                        <div id="navProfilePicture" className="icon iconProfile">
                        </div>
                    </a>
                </div>
            </div>
        );
    }
};

export default Navigation;