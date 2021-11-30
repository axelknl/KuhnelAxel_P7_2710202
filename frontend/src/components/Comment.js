import React from "react";
import edit from "../img/icon/edit.png"
import check from "../img/icon/check.png"
import bin from "../img/icon/bin.png"
import Axios from "axios";
import validate from "../helpers/validate";

class Comment extends React.Component {

    constructor(props) {
        super(props)
        this.profileStyle = {
            backgroundImage: 'url(' + this.props.com.profile_picture + ')',
            backgroundSize: 'cover',
            backgroundPosition : 'center',
        }
        this.state = {
            comModifier : false,
            modifier : undefined,
            inputUpdate : this.props.com.comment_message,
        }
    }

    componentDidMount() {
        document.getElementById("input" + this.props.com.comment_id).value = this.props.com.comment_message

        this.setState({
            modifier : document.getElementById("modifier" + this.props.com.comment_id)
        })

        const user = JSON.parse(sessionStorage.getItem("userData"))
        if (user.id === this.props.com.comment_user || user.role === 'Admin') {
            document.getElementById("edit" + this.props.com.comment_id).style.display = "unset";
        }
    }

    // Ouverture et fermeture de l'éditeur
    openModifier(toOpen) {
        // On ouvre
        if (this.state.comModifier === false ) {
            toOpen.style.display = "flex"
            this.setState({comModifier : true})
        // Sinon on ferme
        } else {
            toOpen.style.display = "none"
            this.setState({ comModifier : false})
        }
    }

    // On supprime le commentaire
    deleteComment() {
        Axios.delete("http://localhost:3200/api/post/comment/id/" + this.props.com.comment_id, {headers : this.props.headers})
        .then((response) => {
            // On ferme l'éditeur
            this.openModifier(this.state.modifier)
            // On relaod le composant parent
            this.props.parentCallback()
        })
    }

    // On vérifie le commentaire
    verifyUpdate() {
        const isValid = validate.createCommentSchema.validate({ message: this.state.inputUpdate})
        // Si valide on modifie le mot de passe
        if (!isValid.error) this.updateComment()
        // Sinon on retourne l'erreur
        else window.alert(isValid.error)
    }

    // On update le commentaire
    updateComment() {
        Axios.patch("http://localhost:3200/api/post/comment/id/" + this.props.com.comment_id, {
            message : this.state.inputUpdate,
        }, {headers : this.props.headers})
        .then((response) => {
            // On ferme l'éditeur
            this.openModifier(this.state.modifier)
            // On relaod le composant parent
            this.props.parentCallback()
        })
    }

    render () {
        return (
            <div className="comment">

                <div className="comment__message">
                    <div style={this.profileStyle} className="comment__profilePic">
                    </div>
                    <span>{this.props.com.username}</span>
                    <p>{this.props.com.comment_message}</p>
                </div>

                <div id={"edit" + this.props.com.comment_id} onClick={() => this.openModifier(this.state.modifier)} className="comment__button">
                    <img src={edit} alt="" />
                </div>

                <div id={"modifier" + this.props.com.comment_id} className="comment__update">
                    <input id={"input" + this.props.com.comment_id} onChange={(e) => {this.setState({ inputUpdate : e.target.value})}} type="text" />
                    <div onClick={() => this.updateComment()} className="comment__update__button">
                        <img src={check} alt="" />
                    </div>
                    <div onClick={() => this.deleteComment()} className="comment__update__button">
                        <img src={bin} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;