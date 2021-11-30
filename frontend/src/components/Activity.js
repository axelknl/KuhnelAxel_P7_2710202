import React from "react";
import data from "../helpers/data";
import ActivityAlert from "./ActivityAlert";

const Activity = () => {
    return (
        <div className="activity">
            <div className="activity__header">
                <h3>Activités</h3>
                <p className="more">Voir plus</p>
            </div>
            {data.map((aAlert) => (
                <ActivityAlert test={aAlert}/>
            ))}
        </div>
    )
}

export default Activity;