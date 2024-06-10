export const loginUser = (email, password) =>
    fetch('http://localho.st:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then((response) => response.json())

export const getUserInfo = () =>
    fetch('http://localho.st:8080/user/info', {
        method: 'GET',
    }).then((response) => response.json())

export const getTodayBirthdayList = () =>
    fetch('http://localho.st:8080/user/list-today', { method: 'GET' }).then(
        (response) => response.json()
    )

export const getUserList = () =>
    fetch('http://localho.st:8080/user/list', { method: 'GET' }).then(
        (response) => response.json()
    )

export const subscribe = (userId, currentStatus) => {
    if (currentStatus) {
        return fetch('http://localho.st:8080/user/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        }).then((response) => response.json())
    }

    return fetch('http://localho.st:8080/user/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    }).then((response) => response.json())
}

export const saveSettings = (daysToNotification, email) => {
    return fetch('http://localho.st:8080/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ daysToNotification, email }),
    }).then((response) => response.json())
}
