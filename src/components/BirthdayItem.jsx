import React from "react";

import '../App.css'

export default function BirthdayItem({firstName, lastName, day, date_month, year}) {

    return <div className="birthday_info">
        <div className='circle'/>
        {firstName} {lastName} - {day} {date_month}, {year} year
    </div>
}

