import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, facebookProvider, Firestoredb, googleProvider } from '../../firebase/firebaseConfig';
import { User } from '../../components/helper/interfaces';

import { doc, setDoc } from 'firebase/firestore';




const initialState: User = {
    id: "",
    email: "",
    name: "",
    photoUrl: "",
    phoneNumber: '',
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    isAuthenticated: false,
    subscription: "",
    time: 0,
    myWorkouts: [],


};


export const userReducer = createSlice({
        name: 'currentUser',
        initialState,
        reducers: {
            setUser: (state, action) => {
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.photoUrl = action.payload.photoURL;
                state.phoneNumber = action.payload.phoneNumber;
                state.isAuthenticated = true;
            },
            updateAvatar: (state, action) => {
                state = action.payload;
            },

            updateUser: (state, action) => {
                Object.assign(state, action.payload);
            },
            logout: (state) => {
                state.id = '';
                state.name = '';
                state.email = '';
                state.photoUrl = '';
                state.phoneNumber = '';
                state.isAuthenticated = false;
            },
        }
    })

export const { setUser, updateAvatar, updateUser,logout } = userReducer.actions;
export default userReducer.reducer

//------------------AUTH FUNCTIONS ------------------//

export const googleLogin = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        if (response) {
            console.log("User authenticated:", auth.currentUser?.uid);
            return {
                id: response.user.uid,
                name: response.user.displayName,
                email: response.user.email,
                photoURL: response.user.photoURL,
                phoneNumber: response.user.phoneNumber,

            }
            
        }
    } catch (error) {
        console.error('Error con Google login: ' + error)
    }
};

export const facebookLogin = async () => {

    try {
        const response = await signInWithPopup(auth, facebookProvider);
        if (response) {
            return {
                id: response.user.uid,
                name: response.user.displayName,
                email: response.user.email,
                photoURL: response.user.photoURL,
                phoneNumber: response.user.phoneNumber,

            }
        }
    } catch (error) {
        console.error('Error con Facebook login: ' + error)
    }
}

export const emailRegister = async (payload: any) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
        console.log('response register',response)
        if (response) {
            try {
                console.log('creating profile ...')
                await updateProfile(response.user, {
                    displayName: payload.name,
                    photoURL: payload.photoUrl,
                    
                })
                
            } catch (error) {
                console.error('error in firebase Auth')
            }
            console.log("User authenticated:", auth.currentUser?.uid);

            try {
                console.log('creating collection ...')
                await setDoc(doc(Firestoredb, "users", response.user.uid), {
                    id: response.user.uid,
                    email: payload.email,
                    name: payload.name,
                    photoUrl: payload.photoUrl,
                    phoneNumber: payload.phoneNumber,
                    age: 0,
                    gender: "",
                    weight: 0,
                    height: 0,
                    isAuthenticated: true,
                    subscription: "",
                    time: 0,
                    myWorkouts: [],
                })        
            } catch (error) {
                console.error('error creating user collection', error)
            }

            console.log('user created')
            const userCreated = true
            return {userCreated}

        }
    } catch (error) {
        console.error('Error con Mail Register: ' + error)
    }
}

export const emailLogin = async (payload: any) => {
    try {
        const response = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        if (response) {

            console.log(response)

            const updatedUser = auth.currentUser;
            // try {
            //     console.log('creating collection ...')
            //     await setDoc(doc(Firestoredb, "users", response.user.uid), {
            //         id: response.user.uid,
            //         email: response.user.email,
            //         name: response.user.displayName,
            //         photoUrl: response.user.photoURL,
            //         phoneNumber: response.user.phoneNumber,
            //         age: 0,
            //         gender: "",
            //         weight: 0,
            //         height: 0,
            //         isAuthenticated: true,
            //         subscription: "",
            //         time: 0,
            //         myWorkouts: [],
            //     })        
            // } catch (error) {
            //     console.error('error creating user collection', error)
            // }

            return {
                id: updatedUser?.uid || response.user.uid,
                name: updatedUser?.displayName || payload.displayName,
                email: updatedUser?.email || response.user.email,
                phoneNumber: updatedUser?.phoneNumber || payload.phoneNumber ,
                photoUrl: updatedUser?.photoURL || payload.photoUrl,
            }
        }
    } catch (error) {
        console.error("Error con MailRegister: " + error);
    }
}