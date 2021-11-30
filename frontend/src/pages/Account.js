import React from "react";
import Navigation from "../components/Navigation";
import AccountModule from "../components/AccountModule";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount"
import Uploader from "../components/Uploader";



const Account = () => {

    if (!sessionStorage.getItem('userData')) {
        window.location.href = '/login'
    }

    return (
        <div className="account">
            <Navigation />
            <Uploader/>
            <div className="account__container container">
                <h3 className="account__title">Paramètres</h3>
                <div className="container__main main">
                    <ul className="container__menu menu">
                        <li className="container__menu__item item">Compte</li>
                    </ul>
                    <div className="container__information information">
                        <AccountModule info={JSON.parse(sessionStorage.getItem('userData'))}/>
                        <ChangePassword info={JSON.parse(sessionStorage.getItem('userData'))}/>
                        <DeleteAccount info={JSON.parse(sessionStorage.getItem('userData'))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;