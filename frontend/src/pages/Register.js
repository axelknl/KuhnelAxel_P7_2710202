import React, {useState} from "react";
import Axios from "axios"
import Logo from "../components/Logo"
import validate from "../helpers/validate";

const Register = () => {

    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [firstnameReg, setFirstnameReg] = useState("");
    const [nameReg, setNameReg] = useState("");
    const [jobReg, setJobReg] = useState("");
    const [ageReg, setAgeReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confpassReg, setConfpassReg] = useState("");

    // On vérifie les entrées formulaire
    const verifyRegister = () => {
        const isValid = validate.registerSchema.validate({
            username : usernameReg,
            first_name : firstnameReg,
            last_name : nameReg,
            job : jobReg,
            email : emailReg,
            password : passwordReg,
            confirm_password : confpassReg,
            age : parseInt(ageReg)
        })

        // Si ok on créer le compte
        if (!isValid.error) register();
        // Sinon on renvoie une erreur
        else window.alert(isValid.error)
    }

    // Création du compte
    const register = () => {
        Axios.post("http://localhost:3200/api/user/", {
            username : usernameReg,
            first_name : firstnameReg,
            last_name : nameReg,
            job : jobReg,
            email : emailReg,
            password : passwordReg,
            confirm_password : confpassReg,
            age : parseInt(ageReg)
        }).then((response) => {
            // Si création on renvoie vers la page de connexion
            window.location.href="/login"
        });
    };

return (
    <div className="register">
        <div className="register__section">
            <div className="register__section__logo"><Logo/></div>
            <h2>Register</h2>
            <p className="register__section__subtitle">Echangez avec vos collègues!</p>

            <div className="register__section__form register__form">
                <label>Pseudo*</label>
                <input onChange={(e) => {setUsernameReg(e.target.value)}} placeholder="John9999"  className="register__form__username"></input>
                <label>Email*</label>
                <input onChange={(e) => {setEmailReg(e.target.value)}} placeholder="mail@website.com"  className="register__form__email"></input>
                <label>Prénom*</label>
                <input onChange={(e) => {setFirstnameReg(e.target.value)}} placeholder="John"  className="register__form__firstname"></input>
                <label>Nom*</label>
                <input onChange={(e) => {setNameReg(e.target.value)}} placeholder="Doe"  className="register__form__lastname"></input>
                <label>Job*</label>
                <input onChange={(e) => {setJobReg(e.target.value)}} placeholder="Lead Dev"  className="register__form__job"></input>
                <label>Age*</label>
                <input onChange={(e) => {setAgeReg(e.target.value)}} type="number" placeholder="22"  className="register__form__age"></input>

                <label>Mot de Passe*</label>
                <input onChange={(e) => {setPasswordReg(e.target.value)}} placeholder="Min. 8 Character" className="register__form__mdp"></input>

                <label>Confirmer Mot de Passe*</label>
                <input onChange={(e) => {setConfpassReg(e.target.value)}} placeholder="Min. 8 Character" className="register__form__checkmdp"></input>

                <div onClick={verifyRegister} className="register__form__button">S'inscrire</div>

                <p className="register__form__notlog">Vous avez déjà un compte ? <a href="/login">C'est par ici</a></p>
            </div>
        </div>
        <div style={{backgroundImage : 'url("/img/background/plumsBg.jpg")'}} className="register__graphic"></div>
    </div>
)
}

export default Register;