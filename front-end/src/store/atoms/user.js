import {Atom} from 'recoil';

export const userState = Atom({
    key:'userState',
    default:{
        isLoading:true,
        userEmail:null
    }
})