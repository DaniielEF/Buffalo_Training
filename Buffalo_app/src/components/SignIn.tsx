
import { Box, Typography } from '@mui/material'
import Logo from '../assets/Logo.png'
import { BodyContainer, NextButton, StackAuth, TextInput } from '../style/styled_Mui'
import { emailLogin, facebookLogin, googleLogin, setUser } from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import UserInfo from './UserInfo'
import useForm from '../hooks/useForm'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from "@mui/icons-material/Facebook";
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'





const SignIn = () => {
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const Height= useSelector((state:RootState)=>state.currentUser.height);
  //const Weight= useSelector((state:RootState)=>state.currentUser.Weight);
  

  const { formValues, handleInputChange } = useForm({
    email: '',
    password: '',
  })

  async function handleLogin(event:any) {
    event.preventDefault();
    await emailLogin({
      email: formValues.email,
      password: formValues.password
    }).then(response=>{
      dispatch(setUser(response))
      console.log('dispatch Login',response)
      handleInfoUser()
    })   
  }


  const handleAuth = async (type: string) => {
    switch (type) {
      case 'google':
        await googleLogin().then(response => {
          dispatch(setUser(response))
        })
        handleInfoUser()
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
        </Box>
  
        <Box 
        component={'form'}
        onSubmit={handleLogin}          
        sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: '1rem',
            width:'80vw',
            
          }}>
          <TextInput
            type='email'
            id='email'
            name='email'
            variant='outlined'
            label='Email'
            onChange={handleInputChange}
         
            
             />

          <TextInput
            type='password'
            id='password'
            name='password'
            variant='outlined'
            label='Password'
          onChange={handleInputChange}
          
          />

          <NextButton type='submit'>Sign In</NextButton>
        </Box>
    
        <Box>
          <Typography sx={{color:'white', fontSize:'14px'}}>Sign In width</Typography>
        <StackAuth spacing={2}>
          <GoogleIcon color="error" className='icon' onClick={() => handleAuth('google')}/>
          <FacebookIcon color='primary' className='icon' onClick={() => handleAuth('facebook')} />
        </StackAuth>
        </Box><br/><br/>
        <Box sx={{position:'relative', marginBottom:'10px'}}>
          <Typography sx={{color:'white', fontSize:'14px'}}>Don't have an account? <NavLink to={'/signUp'}>Sign Up</NavLink></Typography>
        </Box>

      </BodyContainer>
      </>
  )
}

export default SignIn


