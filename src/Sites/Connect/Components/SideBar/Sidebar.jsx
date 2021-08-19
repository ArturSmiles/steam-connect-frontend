import React from 'react'

function Sidebar(props) {
    return (
        <div>
            <ul>
                {props.users.map((users)=>(
                    <li>{users.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
