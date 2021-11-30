import React from "react";

const ConversationNotification = (props) => {

    var profileStyle = {
        backgroundImage : 'url(' + props.conv.peoplePic + ')',
        backgroundSize : 'cover'
    }

    var messageStyle;

    readingOrNot(props);

    function readingOrNot(props) {
        if (props.conv.reading === true) {
            messageStyle = {
                color : 'rgb(109, 106, 106)'
            }
        } else {
            profileStyle = {
                backgroundImage : 'url(' + props.conv.peoplePic + ')',
                backgroundSize : 'cover',
                border: '2px solid blue',
            }
        }
    }

    return (
        <div className="conversationNotification">
            <div style={profileStyle} className="conv__picture"></div>
            <div className="conv__information">
                <p className="conv__user">{props.conv.people}</p>
                <p style={messageStyle} className="conv__message">{props.conv.lastMessage}</p>
            </div>
        </div>
    )
}

export default ConversationNotification;
