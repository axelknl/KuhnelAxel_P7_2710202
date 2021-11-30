import React from "react";
import Axios from "axios";
import Comment from "./Comment"
import likeLogo from "../img/icon/heart.png"
import likedLogo from "../img/icon/heartFull.png"
import sendLogo from "../img/icon/send.png"
import validate from "../helpers/validate";

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.headers = {'Authorization' : 'Bearer ' + this.props.token}
        this.params = {user_id : this.props.post.user_id}
        this.user = JSON.parse(sessionStorage.getItem('userData'));
        this.state = {
            isLike : null,
            like : '',
            message : '',
            commentList : [],
            refresh : '',
            inputUpdate : this.props.post.description,
            description : this.props.post.description,
            window : false
        }
        this.profileStyle = {
            backgroundImage: 'url(' + props.post.profile_picture + ')',
            backgroundSize: 'cover',
            backgroundPosition : 'center',
        }
    }

    // Si le post est liké ou non par l'utilisateur on modifie le state
    whatHeart() {
        if (this.props.likeList.includes(this.props.post.id)) this.setState({ isLike : true})
        else this.setState({ isLike : false})
    }

    // Si le state a changé (liké ou non) On change la couleur du like
    changeHeart() {
        if (this.state.isLike === true) return <img id={"postLike" + this.props.post.id} src={likedLogo} alt=""/>
        else return <img id={"postLike" + this.props.post.id} src={likeLogo} alt=""/>
    }

    // On vérifie avant la modification du Post
    verifyUpdatePost() {
        const isValid = validate.updatePostSchema.validate({ description : this.state.inputUpdate })
        // Si champs validate
        if (!isValid.error) this.updatePost()
        else window.alert(isValid.error)
    }

    // On modifie le post
    updatePost() {
        Axios.patch("http://localhost:3200/api/post/id/" + this.props.post.id, {
            description : this.state.inputUpdate,
        }, {headers : this.headers})
        .then((response) => {
            // Si modification effectué on change la description du post
            this.setState({ description : this.state.inputUpdate, window : false})
        })
    }

    componentDidUpdate() {
        const windowUpdate = document.getElementById("window" + this.props.post.id)
        if (this.state.window === false) windowUpdate.style.display = "none"
        else if (this.props.post.user_id === JSON.parse(sessionStorage.getItem('userData')).id) windowUpdate.style.display = "unset"
    }

    componentDidMount() {
        // On initialise la couleur du coeur au départ
        this.whatHeart();

        const windowUpdate = document.getElementById("window" + this.props.post.id)
        const inputUpdate = document.getElementById("input" + this.props.post.id)
        inputUpdate.value = this.props.post.description

        // Ouverture ou fermeture de la fenêtre update
        if (this.state.window === false) windowUpdate.style.display = "none"
        else windowUpdate.style.display = "unset"

        // Evenement Enter sur input pour update le post
        inputUpdate.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                windowUpdate.style.display = "none"
                this.verifyUpdatePost()
            }
        })

        // Evenement de clique sur le bouton menu du post
        document.getElementById("postMore" + this.props.post.id).addEventListener("click", () => {
            const menuDelete = document.getElementById("deleteMenu" + this.props.post.id);
            // Si l'utilisateur connecté est le propriétaire du post ou un admin on ouvre le menu
            if ((menuDelete.style.display === "" || menuDelete.style.display === "none") && (this.props.post.user_id === JSON.parse(sessionStorage.getItem('userData')).id || this.user.role === "Admin")) menuDelete.style.display = "flex";
            // Sinon le menu reste fermé
            else menuDelete.style.display = "none";
        })  
        
        // Evenement de clique sur le bouton like
        let heart = document.getElementById("postLike" + this.props.post.id);
        heart.addEventListener("click", () => {
            // Si pas liké : On like, on change le nombre de like du post, on créer le like
            if (this.state.isLike === false) {
                this.setState({ isLike: true });
                this.addLike(1);
                this.createLike();
                this.props.likeList.push(this.props.post.id);
                sessionStorage.setItem('userLike', JSON.stringify(this.props.likeList))
            }
            // Si déjà liké : On dislike, on change le nombre de like du post, on supprime le like
            else {
                this.setState({ isLike: false });
                this.addLike(-1);
                this.deleteLike();
                let toSupp = this.props.likeList.indexOf(this.props.post.id)
                if (toSupp >= -1) this.props.likeList.splice(toSupp, 1)
                sessionStorage.setItem('userLike', JSON.stringify(this.props.likeList))
            }
        })
    }

    // On modifie le nombre de like du post (+1 ou -1)
    addLike(n) {
        Axios.patch("http://localhost:3200/api/post/like/" + this.props.post.id, {
            like : this.props.post.likeNbr + n,
        }, {headers : this.headers}
        ).then((response) => {
            this.props.post.likeNbr += n;
            this.setState({like : ''})
        })
    }

    // Création du like
    createLike() {
        Axios.post("http://localhost:3200/api/post/like", {
            user_id : JSON.parse(sessionStorage.getItem('userData')).id,
            post_id : this.props.post.id,
        }, {headers : this.headers})
        .then((response) => {
        })
    }


    // Suppression du like
    deleteLike() {
        Axios.delete("http://localhost:3200/api/post/like/delete", {
            data : {
                user_id : JSON.parse(sessionStorage.getItem('userData')).id,
                post_id : this.props.post.id,
            },
            headers : {
                "Authorization" : "Bearer " +  this.props.token
            }
        })
    }
 
    // Suppression du post
    deletePost() {
        Axios.delete("http://localhost:3200/api/post/id/" + this.props.post.id , {headers : this.headers})
        .then((response) => {
            // On rafraîchit la page
            window.location.reload();
        })
    }

    // On retourne une image si une image est associé à ce post
    returnImage() {
        if (this.props.post.picture !== null && this.props.post.picture !== '' && this.props.post.picture !== undefined) {
            return (
                <div className="post__image">
                        <img src={this.props.post.picture} alt=""/>
                </div>
            )
        }
    }

    //On valide le commentaire
    verifyComment() {
        const isValid = validate.createCommentSchema.validate({ message : this.state.message })
        // Si champs validate
        if (!isValid.error) this.sendComment()
        else window.alert(isValid.error)
    }

    // Ajoute un commentaire
    sendComment() {
        var inputMessage = document.getElementById("postMessage" + this.props.post.id);

        // On récupère la date du jour
        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

        // On envoie le commentaire
        Axios.post("http://localhost:3200/api/post/comment", {
            message : this.state.message,
            date : today,
            user : JSON.parse(sessionStorage.getItem('userData')).id,
            post : this.props.post.id,
        }, {
            headers : {
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
        .then((response) => {
            if (response.status === 201) inputMessage.value = ''
            this.getComment()
        })
    }

    // récupère la liste des commentaires associé à un post
    getComment() {
        Axios.get("http://localhost:3200/api/post/comment/id/" + this.props.post.id, {
            headers : { 'Authorization' : 'Bearer ' + this.props.token }
            }).then((response) => {this.setState({ commentList : response.data})
        })
    }

    // Permet au composant enfant de réactualiser les commentaires dans le composant actuel
    handleCallback = () =>{ this.getComment() }
    
    render () {
        return (
            <div className="post">

                <div className="post__header">
                    <div style={this.profileStyle} className="post__header__profilePic"></div>
                    <div className="post__header__user">
                        <h5 className="post__header__user__name">{this.props.post.username}</h5>
                        <p className="post__header__user__job">{this.props.post.job}</p>
                    </div>
                    <div id={"postMore" + this.props.post.id} className="post__header__more">
                        <img src="./img/icon/more.png" alt=""/>
                    </div>
                    <div id={"deleteMenu" + this.props.post.id} className="post__header__menu">
                        <span onClick={() => this.deletePost()}>Supprimer</span>
                        <span onClick={() => (this.setState({window : true}))} >Modifier</span>
                    </div>
                </div>

                <p className="post__description"><strong>{this.props.post.username}</strong> {this.state.description}</p>

                {this.returnImage()}

                <div className="post__button">
                    <div className="post__button__social">
                        <div className="post__button__social__like post__button__action">
                            {this.changeHeart()}
                        </div>
                    </div>
                </div>

                <p className="post__likenbr">Aimé par <strong>{this.props.post.likeNbr} personnes</strong></p>

                <div className="post_comment">
                    {this.state.commentList.map((comItem) => (
                        <Comment key={comItem.comment_id} parentCallback={this.handleCallback} headers={this.headers} com={comItem}/>
                    ))}
                </div>

                <div className="post__write">
                    <input id={"postMessage" + this.props.post.id} onChange={(e) => {this.setState({message : e.target.value})}} type="text" />
                    <div onClick={() => this.verifyComment()} className="post__write__send">
                        <img src={sendLogo} alt="" />
                    </div>
                </div>

                <span onClick={() => this.getComment()} className="post__showComment">Voir les commentaires (+)</span>

                <div id={"window" + this.props.post.id} className="post__modifier">
                    <input id={"input" + this.props.post.id} onChange={(e) => {this.setState({ inputUpdate : e.target.value})}} type="text" />
                </div>
            </div>
        )
    }
}

export default Post;