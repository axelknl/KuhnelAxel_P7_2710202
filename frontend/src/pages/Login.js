import React, { useState } from "react";
import Axios from  "axios"
import Logo from "../components/Logo"
import validate from "../helpers/validate";

const Login = () => {

        const [emailLog, setEmailLog] = useState("");
        const [passwordLog, setPasswordLog] = useState("");

        // Vérifications des entrées du formulaire
        const verifyForm = () => {
            const isValid = validate.loginSchema.validate({ email : emailLog, password : passwordLog})
            // Si valide on lance l'authentification
            if (!isValid.error) login();
            // Sinon on affiche l'erreur
            else window.alert(isValid.error)
        }

        // Authentification
        const login = () => {
            Axios.post("http://localhost:3200/api/user/login", {
                email : emailLog,
                password : passwordLog,
            }).then((response) => {
                const {token, ...dataWithoutToken} = response.data
                // Stockage des informations utilisateurs dans le sessionStorage
                sessionStorage.setItem('userData', JSON.stringify(dataWithoutToken));
                sessionStorage.setItem('userToken', response.data.token)

                // On récupère les likes utilisateurs
                getLike(token, response.data.id)
            })
            .catch(function(error) { window.alert(error.response.data.message) })
        };

        // Récupération des likes de l'utilisateur
        function getLike(token, id) {
            Axios.get("http://localhost:3200/api/post/like/get/" + id, {
                headers : {
                    "Authorization" : "Bearer " + token,
                }
            }).then((response) => {
                    const tab = [];
                    response.data.forEach(element => { tab.push(element.like_post) });

                    // Si like trouvé on les stock sous forme de liste dans le sessionStorage
                    sessionStorage.setItem('userLike', JSON.stringify(tab))

                    // Redirection vers la page d'accueil
                    document.location.href="/";
            })
            .catch(function(error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        // Si aucun like on passe une liste vide
                        sessionStorage.setItem('userLike', JSON.stringify([]))
                        // Redirection vers la page d'accueil
                        document.location.href="/";
                    }
                }
            })
        }

    return (
        <div className="login">
            <div className="login__section">
                <div className="login__section__logo"><Logo/></div>
                <h2>Login</h2>
                <p className="login__section__subtitle">Echangez avec vos collègues!</p>

                <div className="login__section__form login__form">
                    <label>Email*</label>
                    <input type="text" onChange={(e) => {setEmailLog(e.target.value)}} placeholder="mail@website.com"  className="login__form__email"></input>
                    <label>Mot de Passe*</label>
                    <input type="password" onChange={(e) => {setPasswordLog(e.target.value)}} placeholder="Min. 8 Character" className="login__form__mdp"></input>

                    <div onClick={verifyForm} className="login__form__button">Login</div>

                    <p className="login__form__notsign">Vous êtes nouveaux ? <a href="/register">Inscrivez vous ici</a></p>
                </div>
            </div>
            <div style={{backgroundImage : 'url("/img/background/plumsBg.jpg")'}} className="login__graphic"></div>
        </div>
    )
}

export default Login;