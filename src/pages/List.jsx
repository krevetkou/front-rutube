import React, { useLayoutEffect, useState } from 'react'

import { ArrowLeft, UserList } from '../icons'
import { getUserList, subscribe } from '../modules'
import { Loader, Switcher } from '../components'

export const List = ({ setScreen }) => {
    const [isLoading, setLoading] = useState(true)
    const [userList, setUserList] = useState([])
    const [isDisabled, setDisabled] = useState(false)

    useLayoutEffect(() => {
        getUserList()
            .then((data) => {
                if (data) {
                    setUserList(data)
                }
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    const handleClickSubscribe = (id, status) => {
        setDisabled(true)
        subscribe(id, status)
            .then((success) => {
                if ({ success }) {
                    setUserList(
                        userList.map((user) => {
                            if (user.id === id) {
                                return { ...user, isSubscribed: status }
                            }

                            return user
                        })
                    )
                }
                setDisabled(false)
            })
            .catch(() => {
                setDisabled(false)
            })
    }

    return (
        <>
            <div className="row">
                <UserList className="icon" /> Все сотрудники
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="body">
                    <ul className="list">
                        {userList.map(
                            ({ id, name, dateOfBirth, isSubscribed }) => (
                                <li className="user" key={id}>
                                    {name}
                                    {dateOfBirth}
                                    <Switcher
                                        checked={isSubscribed}
                                        onChange={(status) =>
                                            handleClickSubscribe(id, status)
                                        }
                                        disabled={isDisabled}
                                    >
                                        {isSubscribed
                                            ? 'Отписаться'
                                            : 'Подписаться'}
                                    </Switcher>
                                </li>
                            )
                        )}
                    </ul>
                    <div
                        className="row right"
                        onClick={() => setScreen('main')}
                    >
                        Назад <ArrowLeft className="icon" />
                    </div>
                </div>
            )}
        </>
    )
}
