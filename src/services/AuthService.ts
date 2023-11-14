import {IUser} from "../pages/LoginRegisterPage";

/**
 * Set username and token when user is login.
 * @param userCredentials
 */
export const setUserCredentials = (userCredentials: Pick<IUser['user'], 'username' | 'token'>) => {
    if (userCredentials.username && userCredentials.token) {
        sessionStorage.setItem('username', userCredentials.username)
        sessionStorage.setItem('token', userCredentials.token)
    }

}
/**
 * Get credentials from session storage like username and token for login user.
 */
export const getUserCredentials = (): Pick<IUser['user'], 'username' | 'token'> => {
    return {
        username: sessionStorage.getItem('username'),
        token: sessionStorage.getItem('token')
    }
}
/**
 * Check if user is login
 */
export const isSignIn = () => {
    const credentials = getUserCredentials();
    return !!(credentials.username && credentials.token)
}
/**
 * Remove user credentials from session storage after logout
 */
export const removeUserCredentials = () => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
}

export const itItself = () => {
    return true
}
