import React, { useContext, useLayoutEffect, useState } from 'react'
import plural from 'plural-ru'

import { Users, Loader, Modal, NumberInput } from '../components'
import { Calendar, Bell, ArrowRight } from '../icons'
import { getTodayBirthdayList, saveSettings } from '../modules'
import { UserContext } from '../context'

const MIN_DAYS = 1
const MAX_DAYS = 6

export const Main = ({ setScreen }) => {
    const { userInfo, setUserInfo } = useContext(UserContext)

    const [isLoading, setLoading] = useState(true)
    const [userList, setUserList] = useState([])
    const [isSettingsOpen, setSettingsOpen] = useState(false)

    const today = new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    useLayoutEffect(() => {
        getTodayBirthdayList()
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

    const handleOpenSettings = () => setSettingsOpen(true)
    const handleCloseSettings = () => setSettingsOpen(false)

    const handleSaveSettings = () => {
        saveSettings(userInfo?.daysToNotification || 2, userInfo?.email)
            .then((data) => {
                if (data) {
                    setSettingsOpen(false)
                }
            })
            .catch(() => {})
    }

    return (
        <>
            <div className="row">
                <Calendar className="icon" /> {today}
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="body">
                    <Users list={userList} />
                    <div
                        className="row right"
                        onClick={() => setScreen('list')}
                    >
                        Ко всем сотрудникам <ArrowRight className="icon" />
                    </div>
                </div>
            )}
            {userInfo && (
                <div className="settings row" onClick={handleOpenSettings}>
                    Настройка оповещений <Bell className="icon" />
                </div>
            )}
            <Modal
                title="Настройка оповещений"
                isOpen={isSettingsOpen}
                onClose={handleCloseSettings}
                buttons={
                    <button className="button" onClick={handleSaveSettings}>
                        Сохранить
                    </button>
                }
            >
                <label className="row">
                    Оповещать за{' '}
                    <NumberInput
                        value={userInfo?.daysToNotification}
                        onChange={(value) => {
                            setUserInfo({
                                ...userInfo,
                                daysToNotification: value,
                            })
                        }}
                        min={MIN_DAYS}
                        max={MAX_DAYS}
                    />
                    {plural(
                        userInfo?.daysToNotification,
                        'день',
                        'дня',
                        'дней'
                    )}
                </label>
                <label className="row">
                    Ваша почта
                    <input
                        value={userInfo?.email || ''}
                        onChange={(event) => {
                            const val = event.target.value

                            setUserInfo({ ...userInfo, email: val })
                        }}
                        className="input"
                    />
                </label>
            </Modal>
        </>
    )
}
