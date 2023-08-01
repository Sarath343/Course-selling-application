import {userState} from "../atoms/userstate"
import { selector } from 'recoil'

export const usernameSelector = selector({
    key: "usernameSelector",
    get: ({ get })=> {
    const state = get(userState)
    return state.username;
    }
})

export const userLoadingSelector = selector({
    key: "userLoadingSelector",
    get: ({get})=> {
    const state = get(userState)
    return state.userLoading
}})
