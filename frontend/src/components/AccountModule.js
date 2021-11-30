import React from "react";
import Axios from "axios";
import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import validate from "../helpers/validate";

const firebaseConfig = {
    apiKey: 'AIzaSyCoe6MeUd8VPHuIv7F_S3R-0au5iLjT5NY',
    authDomain: 'groupomania-eb34d.firebaseapp.com',
    databaseURL: 'https://groupomania-eb34d-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'groupomania-eb34d.appspot.com'
  };

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);



class AccountModule extends React.Component {

    constructor(props) {
        super(props);
        this.pPicture = "https://www.handiclubnimois.fr/wp-content/uploads/2020/10/blank-profile-picture-973460_1280.png";
        this.user = props.info;
        this.token = sessionStorage.getItem('userToken');
        this.state = {
            image : null,
            nameRef: this.user.first_name,
            lnameRef : this.user.last_name,
            userRef : this.user.username,
            mailRef : this.user.email,
            jobRef : this.user.job,
            ageRef : this.user.age,
        };
    }

    componentDidMount() {
        
        //Ajout des données utilisateurs à nos champs input
        document.getElementById("profilePicture").style.backgroundImage = 'url(' + this.user.profile_picture + ')';
        document.getElementById("nameUpdateInput").value = this.user.first_name;
        document.getElementById("lnameUpdateInput").value = this.user.last_name;
        document.getElementById("userUpdateInput").value = this.user.username;
        document.getElementById("mailUpdateInput").value = this.user.email;
        document.getElementById("jobUpdateInput").value = this.user.job;
        document.getElementById("ageUpdateInput").value = this.user.age;

        //Récupération de l'input Files
        const uploader = document.getElementById('pictureUpload');

        //A l'upload on change la photo de prévisualisation
        uploader.addEventListener('change', () => {
            this.setState({
                image : uploader.files[0],
            })
            document.getElementById("profilePicture").style.backgroundImage = 'url(' + URL.createObjectURL(uploader.files[0]) + ')';
        })
    }

    // On vérifie les données
    verifyUpdate() {
        const isValid = validate.updateUserSchema.validate({ email: this.state.mailRef, first_name: this.state.nameRef,
        last_name : this.state.lnameRef, job : this.state.jobRef, username : this.state.userRef, age : this.state.ageRef});

        // Si pas d'erreur on update Sinon on retourne l'erreur
        if (!isValid.error) this.updateInfo()
        else window.alert(isValid.error)
    }

    // Update des infos
    updateInfo() {

        // Si pas d'image
        if (this.state.image === null) {
            Axios.patch("http://localhost:3200/api/user/id/" + this.user.id,{
                        username : this.state.userRef,
                        first_name : this.state.nameRef,
                        last_name : this.state.lnameRef,
                        job : this.state.jobRef,
                        email : this.state.mailRef,
                        age : this.state.ageRef
                    }, {
                        headers : {
                            'Authorization' : 'Bearer ' + this.token,
                        }
                    }).then((response) => {
                        const {message, info, ...dataWithoutMessage} = response.data;
                        sessionStorage.setItem('userData', JSON.stringify(dataWithoutMessage));
                        window.alert("Vos informations ont bien étées sauvegardées")
                        window.location.reload();
                    })

        // Si il y'a une image
        } else {

            // On envoie notre image a firebase
            let file = this.state.image;

            const filePath = 'pictureProfile/' + this.state.image.name;

            const profilePicRef = ref(storage, filePath );

            const uploadTask = uploadBytesResumable(profilePicRef, file);
            uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                // eslint-disable-next-line
                switch (snapshot.state) {
                    case 'paused' : 
                        console.log('Upload is paused');
                        break;
                    case 'running' :
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // eslint-disable-next-line
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('You do not have the authorization')
                        break;
                    case 'storage/canceled' :
                        console.log('Upload has been canceled')
                        break;
                    case 'storage/unknown' :
                        console.log('Unknown error occured')
                        break;
                }
            },
            () => {

                // On update nos infos et on stock l'url firebase de l'image
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    Axios.patch("http://localhost:3200/api/user/id/" + this.user.id,{
                        username : this.state.userRef,
                        first_name : this.state.nameRef,
                        last_name : this.state.lnameRef,
                        profile_picture : downloadURL,
                        job : this.state.jobRef,
                        email : this.state.mailRef,
                        age : this.state.ageRef
                    }, {
                        headers : {
                            'Authorization' : 'Bearer ' + this.token,
                        }
                    }).then((response) => {
                        const {message, info, ...dataWithoutMessage} = response.data;
                        sessionStorage.setItem('userData', JSON.stringify(dataWithoutMessage));
                        window.alert("Vos informations ont bien étées sauvegardées")
                        window.location.reload();
                    })
                })
            }
            )
        }  
    }

    

    render() {
        return (
            <div className="accmodule">
                <h3>Account</h3>
                <div className="accmodule__avatar">
                    <h5>Avatar</h5>
                    <div className="accmodule__avatarrow row">
                        <div id="profilePicture" className="accmodule__picture">
                        </div>
                        <label htmlFor="pictureUpload" >Upload</label>
                        <input type="file" placeholder="upload" id="pictureUpload" className="pictureUpload" />
                    </div>
                </div>

                <hr />

                <div className="accmodule__name row rowspace">
                    <div className="accmodule__name__fname col">
                        <label>Prénom</label>
                        <input id='nameUpdateInput' onChange={(e) => {this.setState({ nameRef : e.target.value})}} type="text" />
                    </div>

                    <div className="accmodule__name__lname col">
                        <label>Nom</label>
                        <input id='lnameUpdateInput' onChange={(e) => {this.setState({ lnameRef : e.target.value})}} type="text" />
                    </div>
                </div>

                <hr />

                <div className="accmodule__mail row rowspace">
                    <div className="accmodule__mail__username col">
                        <label>Pseudo</label>
                        <input id='userUpdateInput' onChange={(e) => {this.setState({ userRef : e.target.value})}} type="text" />
                    </div>

                    <div className="accmodule__mail__email col">
                        <label>Email</label>
                        <input id='mailUpdateInput' onChange={(e) => {this.setState({ mailRef : e.target.value})}} type="text" />
                    </div>
                </div>

                <hr />

                <div className="accmodule__job row rowspace">
                    <div className="accmodule__job__job col">
                        <label>Job</label>
                        <input id='jobUpdateInput' onChange={(e) => {this.setState({ jobRef : e.target.value})}} type="text" />
                    </div>

                    <div className="accmodule__job__age col">
                        <label>Age</label>
                        <input id='ageUpdateInput' onChange={(e) => {this.setState({ ageRef : e.target.value})}} type="number" />
                    </div>
                </div>

                <hr />

                <div className="accmodule__save">
                    <button id="updateButton" onClick={() => this.verifyUpdate()} className="save">Sauvegarder</button>
                </div>
            </div>
        )
    }
}

export default AccountModule;