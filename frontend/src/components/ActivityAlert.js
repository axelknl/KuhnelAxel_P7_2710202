import React from "react";

const ActivityAlert = (props) => {
    
    var typeMessage;
    var typeIcon;
    var profileStyle = {
        backgroundImage: 'url(' + props.test.profilePic + ')',
        backgroundSize: 'cover'
    }

    chooseType(props);

    function chooseType(props) {
        if (props.test.type === 'like') {
            typeMessage = "a aimé votre publication";
            typeIcon = "./img/icon/heart.png";
        } else if (props.test.type === 'sub') {
            typeMessage = "vous suit";
            typeIcon = "./img/icon/add-user.png";
        } else {
            typeMessage = "a commenté votre publication";
            typeIcon = "./img/icon/comment.png";
        }
    }

    return (
        <div className="activityalert">
            <div style={profileStyle} className="activityalert__profile">
            </div>
            <p className="activityalert__message"><strong>{props.test.name}</strong> {typeMessage}</p>
            <div className="activityalert__type">
                <div className="activityalert__type__box">
                    <img src={typeIcon} alt="alert type" />
                </div>
            </div>
        </div>
    )
}

export default ActivityAlert;