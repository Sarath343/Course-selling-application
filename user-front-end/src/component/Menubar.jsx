import {  Button } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { userLoadingSelector, usernameSelector } from '../store/selectors/userselector';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';
 const Menubar=()=>{
    const isMenu = useRecoilValue(usernameSelector);
    const isLoading = useRecoilValue(userLoadingSelector);
    const navigate = useNavigate();
    if(isLoading)
    return <Loading/>
    if(isMenu)
    return <div style={{
        display: "flex",
        justifyContent: "end",
        padding: 4,
        zIndex: 1,

    }}>
        <Button size={"medium"}
            variant="contained" >Wish List</Button>
        <Button size={"medium"}
            variant="contained" >Purchased Courses</Button>
    </div>
    return <></>
}

export default Menubar;