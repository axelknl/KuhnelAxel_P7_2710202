import Axios from "axios";
import React from "react";
import validate from "../helpers/validate";

// Import des Logos
import CloseLogo from "../img/icon/close.png";

class Uploader extends React.Component {

    constructor() {
        super();
        this.token = sessionStorage.getItem('userToken');
        this.state = {
            image : '',
            description : '',
        }
    }

    componentDidMount() {
        // Si on clique sur la croix on ferme la fenêtre
        const close = document.getElementById("closeUploader");
        const container = document.getElementById("uploaderContainer");
        close.addEventListener('click', () => { container.style.display = 'none' })
    }

    // Prévisualisation de l'image
    displayPic(input) {
        // Si pas d'image dans le champ, on enlève la prévisualisation
        if (input.length > 0) document.getElementById("imgToUp").style.display = "unset";
    }

    // Vérifications des entrées du formulaire
    verifyForm() {
        const isValid = validate.createPostSchema.validate({ description: this.state.description, picture: this.state.image})
        // Si champs valide
        if (!isValid.error) {
            if (this.state.image === '' && this.state.description === '') window.alert('Veuillez ajouter une image ou un text')
            // Si au moins un des deux champs est rempli on créer le post
            else this.post();
        // Sinon on affiche l'erreur
        } else window.alert(isValid.error)
    }

    // Création du post
    post() {
        // Récupération de la date du jour
        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

        // Si post sans image on définit l'image à NULL
        var image = this.state.image
        if (this.state.image !== '') {
            if (this.state.image.length === 0) image = null;
        }

        // Envoie de la requête
        Axios.post("http://localhost:3200/api/post/", {
            description : this.state.description,
            picture : image,
            date : today
        }, {
            headers : {
                'Authorization' : 'Bearer ' + this.token
            }
        }).then((response) => {
            console.log(response);
            // On recherge la page
            window.location.reload();
        })
    }
    
    render() {
        return (
            <div id="uploaderContainer" className="uploader">
                <div className="uploader__box">

                    <div id="closeUploader" className="close">
                        <img src={CloseLogo} alt="closeButton" />
                    </div>

                    <div className="uploader__box__row">
                        <label>Image</label>
                        <div className="picture_upload">
                            <input onChange={(e) => {this.displayPic(e.target.value) ; this.setState({ image : e.target.value})}} type="text" name="memeUrl" id="memeUrl" />
                        </div>
                    </div>

                    <div className="uploader__box__row">
                        <label>Description</label>
                        <textarea onChange={(e) => {this.setState({ description : e.target.value})}} name="memeDesc" id="memeDesc" />
                    </div>

                    <div className="uploader__box__row">
                        <div id="backImageUp" className="img__container">
                            <img id="imgToUp" src={this.state.image} alt="file to upload"/>
                        </div>
                    </div>

                    <div className="uploader__buttonBox">
                        <button id="updateButton" onClick={() => this.verifyForm()} className="post">Poster</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Uploader;