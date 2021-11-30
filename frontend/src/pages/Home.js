import Navigation from "../components/Navigation";
import Feed from "../components/Feed";
import Uploader from "../components/Uploader";

const Home = () => {
    return (
        <div className="home">
            <Navigation/>
            <Uploader/>
            <div className="container">
                <Feed/>
            </div>
        </div>
    )
}

export default Home;