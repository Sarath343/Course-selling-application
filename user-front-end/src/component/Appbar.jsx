
import { Typography, Button } from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userLoadingSelector, usernameSelector } from '../store/selectors/userselector';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';
import { userState } from '../store/atoms/userstate';
const Appbar = () => {
    const navigate = useNavigate();
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
        backgroundColor: '#028df7'
    }}>
        <div style={{ marginLeft: 10, cursor: "pointer" }}   >
            <Typography variant={"h6"} onClick={() => { navigate('/') }}>Course Pool</Typography>
        </div>
        <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10, display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                    <AppbarButtons />
                </div></div></div>
    </div>
}


const AppbarButtons = () => {
    const username = useRecoilValue(usernameSelector);
    const isLoading = useRecoilValue(userLoadingSelector);
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState)
    if (isLoading)
        return <Loading />
    if (!username)
        return <div>
            <Button size={"large"}
                variant={"contained"}
                onClick={() => {
                    navigate("/Login")
                }}>Login</Button>
            <Button
                size={"large"}
                variant={"contained"}
                onClick={() => {
                    navigate("/Signup")
                }}
            >SignUp</Button></div>
    return <div>
        <Button
            size={"large"}
            variant={"contained"}
            onClick={() => {
                navigate("/")
                localStorage.setItem('token', null)
                setUser({
                    userLoading: false,
                    username: null
                })
            }}
        >Logout</Button>
    </div>
}
export default Appbar; 