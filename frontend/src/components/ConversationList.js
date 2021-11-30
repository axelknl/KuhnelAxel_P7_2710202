import React from "react";
import data from "../helpers/conversationData";
import ConversationNotification from "./ConversationNotification";

const ConversationList = () => {
    return (
        <div className="conversationList">
<           div className="conversation__header">
                <h3>Messages</h3>
                <div className="conversation__header__logo logo">
                    <img src="./img/icon/write.png" alt="" />
                </div>
            </div>
            {data.map((convItem) => (
                    <ConversationNotification conv={convItem}/>
                ))}
        </div>
    )
}

export default ConversationList;