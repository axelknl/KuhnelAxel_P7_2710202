import Axios from "axios";
import React from "react";
import validate from "../helpers/validate";

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.info;
        this.token = sessionStorage.getItem('userToken');
        this.state = {
            newPassword : undefined,
            confirmPassword : undefined,
        }
    }

    //Vérifications des entrées du formulaire
    verifyUpdate() {
        const isValid = validate.updatePasswordSchema.validate({ password: this.state.newPassword, confirm_password: this.state.confirmPassword})
        // Si valide on modifie le mot de passe
        if (!isValid.error) this.updatePassword()
        // Sinon on retourne l'erreur
        else window.alert(isValid.error)
    }

    // Modification du mot de passe
    updatePassword() {
        Axios.patch("http://localhost:3200/api/user/password/" + this.user.id, {
            password : this.state.newPassword
        }, {
            headers : {
                'Authorization' : 'Bearer ' + this.token
            }
        }).then((response) => {
            // On clear le sessionStorage
            sessionStorage.clear();
            // On retourne à la page login
            window.location.href = "/login";
        })
    }

    render() {
        return (
            <div className="cpassword">
                <h4>Modifier mon Mot de Passe</h4>
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Nouveau mot de passe</label>
                        <input onChange={(e) => {this.setState({ newPassword : e.target.value})}} type="password" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Confirmer mot de passe</label>
                        <input onChange={(e) => {this.setState({ confirmPassword : e.target.value})}} type="password" />
                    </div>
                </div>
                <hr />
                <div className="button">
                    <span onClick={() => this.verifyUpdate()}>Modifier</span>
                </div>
            </div>
        )
    }
}

export default ChangePassword;