import React, {useContext} from "react";
import {Context} from "../App"

export default function EmployeeItem({firstName, lastName, id, completed}) {
    const [state, dispatch] = useContext(Context)

    return <div className="info_field" key={id}>
        <input type='checkbox' checked={completed}
               onChange={(e) => {
                   dispatch({type: 'completed', payload: id})
               }}/>
        <div className="info_field_text">{lastName} {firstName}</div>
    </div>
}
