import React from "react";
import Post from "./Post";
import Axios from "axios";

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.token = sessionStorage.getItem('userToken');
        this.like = JSON.parse(sessionStorage.getItem('userLike'));
        this.state = {
            data : [],
        }
    }

    componentDidMount() {

        // On récupère la list des posts
        Axios.get("http://localhost:3200/api/post", {
            headers : {
                'Authorization' : 'Bearer ' + this.token,
            }
            }).then((response) => {
                this.setState({ data : response.data})
        })
    }

    render() {
        return (
            <div className="feed">
                {this.state.data.map((postItem) => (
                    <Post key={postItem.id} likeList={this.like} token={this.token} post={postItem}/>
                ))}
            </div>
        )
    }
}

export default Feed;