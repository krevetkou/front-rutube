import React from 'react'

import './Users.css'

export const Users = ({ list }) => {
    return (
        <>
            {list.length ? (
                <>
                    <h3>Сегодня день рождения отмечают:</h3>
                    <ul className="list">
                        {list.map(({ id, name, email }) => (
                            <li className="user" key={id}>
                                {name}
                                <a href={`mailto:${email}`}>Поздравить</a>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <span className="text">
                    Сегодня некого поздравлять, но можно отметить что-нибудь
                    другое
                </span>
            )}
        </>
    )
}
