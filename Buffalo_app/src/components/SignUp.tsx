import { Box, Typography } from "@mui/material"
import { BodyContainer, NextButton, StackAuth, TextInput } from "../style/styled_Mui"
import Logo from "../assets/Logo.png"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from "@mui/icons-material/Facebook";
import { NavLink, useNavigate } from 'react-router-dom'
import { emailRegister, facebookLogin, googleLogin, setUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { Field, Form, Formik } from "formik";
import { User } from "./helper/interfaces";
import { RootState } from "../redux/store";


const ColPhone = /^[3]\d{9}$/
interface Pass {
    password: string
}

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate= useNavigate()
    const Height= useSelector((state:RootState)=>state.currentUser.height)

    const initialValues: User & Pass = {
        id: "",
        name: '',
        email: "",
        phoneNumber: "",
        password: "",
        photoUrl: "",
        isAuthenticated: false
    };

    //Validacion con Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Full name is required').min(4),
        email: Yup.string().required('Email is required').email('Only valid email address'),
        phoneNumber: Yup.string().required('Phone number is required')
            .min(10, "too short").max(10, "too long").matches(ColPhone, 'Phone number is not valid'),
        password: Yup.string().required("Password is required").min(6, "Minimum 6 characters"),
        photoURL: Yup.string().url("Must be a valid URL").optional(),
    })

    //Funcion Submit
    const createUserEmail = async (values: User & Pass) => {
        console.log(values)
        try {
             const response = await emailRegister(values);
            console.log('try response', values)
            if(response){
                navigate('/login')
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }


    //Autenticación de usuario por Firebase Authentication
    const handleAuth = async (type: string) => {
        switch (type) {
            case 'google':
                await googleLogin().then(response => {
                    dispatch(setUser(response))
                    console.log(response)
                    handleInfoUser()

                })
                break;
            case 'facebook':
                await facebookLogin().then(response => {
                    dispatch(setUser(response))
                    handleInfoUser()
                })
                break;
            default:
                break;
        }
    }

    //Validacion para redireccionar usuario
    const handleInfoUser =()=>{
        if (Height!==0){
          navigate('/home')
        }else{
          navigate('/heightChoice')
        }  
    }
   

    return (
        <>
            <BodyContainer>
                <Box>
                    <img src={Logo} width={'170'} />
                    <Typography color="#fff" variant="h3">Sign Up</Typography>
                </Box>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        createUserEmail(values)
                        console.log('submit send', values)
                    }}

                >

                    {({ errors, touched }) => (
                        <Form>
                            <Box
                                component={'div'}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '2rem',
                                    gap: '1rem',
                                    width: '80vw',
                                }}
                            >
                                <Field
                                    as={TextInput}
                                    type="text"
                                    id="name"
                                    name="name"
                                    variant="outlined"
                                    label="Full Name"
                                    fullWidth
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />

                                <Field
                                    as={TextInput}
                                    type="email"
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    label="Email"
                                    fullWidth
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />

                                <Field
                                    as={TextInput}
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    variant="outlined"
                                    label="Phone Number"
                                    fullWidth
                                    error={touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />

                                <Field
                                    as={TextInput}
                                    type="password"
                                    id="password"
                                    name="password"
                                    variant="outlined"
                                    label="Password"
                                    fullWidth
                                    error={touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />

                                <Field
                                    as={TextInput}
                                    type="url"
                                    id="photoUrl"
                                    name="photoUrl"
                                    variant="outlined"
                                    label="Photo URL"
                                    fullWidth
                                    error={touched.photoUrl && !!errors.photoUrl}
                                    helperText={touched.photoUrl && errors.photoUrl}
                                />
                                <NextButton type="submit">Registration</NextButton>
                            </Box>
                        </Form>
                    )}


                </Formik>

                <Box>
                    <Typography sx={{ color: 'white', fontSize: '14px' }}>OR Sign In width</Typography>
                    <StackAuth spacing={2}>
                        <GoogleIcon color="error" className='icon' onClick={() => handleAuth('google')} />
                        <FacebookIcon color='primary' className='icon' onClick={() => handleAuth('facebook')} />
                    </StackAuth>
                </Box><br /><br />
                <Box sx={{ position: 'relative', marginBottom: '10px' }}>
                    <Typography sx={{ color: 'white', fontSize: '14px' }}>Do you have an account? <NavLink to={'/login'}>Sign In</NavLink></Typography>
                </Box>
            </BodyContainer>
        </>
    )
}

export default SignUp