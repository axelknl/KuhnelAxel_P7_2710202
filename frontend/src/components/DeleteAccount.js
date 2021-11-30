import Axios from "axios";
import React from "react";

class DeleteAccount extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.info;
        this.token = sessionStorage.getItem('userToken');
        this.state = {
            check : false,
        }
    }

    deleteAccount() {
        Axios.delete("http://localhost:3200/api/user/id/" + this.user.id, {
            headers : {
                'Authorization': 'Bearer ' + this.token,
            }
        }).then((response) => {
            console.log(response)
            sessionStorage.clear();
            window.location.href = "/login";
        })
    }
    
    render() {
        return (
            <div className="daccount">
                <h4>Supprimer mon compte</h4>
                <div className="row">
                    <input type="checkbox" name="" id="" />
                    <label>Je suis sûr de vouloir supprimer mon compte</label>
                </div>
                <hr />
                <div className="button">
                    <span onClick={() => this.deleteAccount()}>Supprimer</span>
                </div>
            </div>
        )
    }
}

export default DeleteAccount;