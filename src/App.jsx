import React, { useLayoutEffect, useState } from 'react'

import { Main, List } from './pages'
import { Loader, Modal } from './components'
import { getUserInfo, loginUser } from './modules'
import { Login } from './icons'
import { UserContext } from './context'

import './App.css'

function App() {
    const [screen, setScreen] = useState('loading')
    const [userInfo, setUserInfo] = useState(undefined)
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(() => {
        getUserInfo()
            .then((data) => {
                if (data) {
                    setUserInfo(data)
                }
                setScreen('main')
            })
            .catch(() => setScreen('main'))
    }, [])

    const handleOpenLoginModal = () => setLoginModalOpen(true)
    const handleCloseLoginModal = () => setLoginModalOpen(false)

    const handleLoginUser = () => {
        loginUser(login, password)
            .then((data) => {
                if (data) {
                    setUserInfo(data)
                }
                handleCloseLoginModal()
            })
            .catch(handleCloseLoginModal)
    }

    return (
        <div className="app">
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
                {screen === 'loading' && <Loader />}
                {screen === 'main' && <Main setScreen={setScreen} />}
                {screen === 'list' && <List setScreen={setScreen} />}
                <Modal
                    isOpen={isLoginModalOpen}
                    onClose={handleCloseLoginModal}
                >
                    Войти
                </Modal>
                {!userInfo && (
                    <div
                        className="settings row"
                        onClick={handleOpenLoginModal}
                    >
                        Войти <Login className="icon" />
                    </div>
                )}
                <Modal
                    title="Авторизация"
                    isOpen={isLoginModalOpen}
                    onClose={handleCloseLoginModal}
                    buttons={
                        <button
                            className="button"
                            onClick={handleLoginUser}
                            disabled={!login || !password}
                        >
                            Войти
                        </button>
                    }
                >
                    <label className="row">
                        Логин
                        <input
                            value={login}
                            onChange={(event) => {
                                const val = event.target.value

                                setLogin(val)
                            }}
                            className="input"
                        />
                    </label>
                    <label className="row">
                        Пароль
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => {
                                const val = event.target.value

                                setPassword(val)
                            }}
                            className="input"
                        />
                    </label>
                </Modal>
            </UserContext.Provider>
        </div>
    )
}

export default App
