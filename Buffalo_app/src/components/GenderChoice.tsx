import { Box, Button, Typography } from "@mui/material"
import { BodyContainer } from "../style/styled_Mui"
import Logo from '../assets/Logo.png'
import { updateInfoUser } from "../firebase/helper/request"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"
import { RootState } from "../redux/store"



const GenderChoice = () => {
    const dispatch = useDispatch()
    const userID = useSelector((state: RootState) => state.currentUser.id)
    const navigate = useNavigate();

    const handleGender = async(selectedValue:string)=>{
        const updates = { ['gender']: selectedValue };
        console.log(updates)

        try {
            await updateInfoUser(userID, updates)
            dispatch(updateUser(updates))
          } catch (error) {
            console.error("Failed to update user:", error);
          }
        navigate('/home')
    }


  return (
    <BodyContainer>
    <Box>
      <img src={Logo} width={'170'} />
      <Typography color="#fff" variant="subtitle2">Enter your gender</Typography>
    </Box>

    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
        <Button onClick={()=>handleGender('Male')}>Male</Button>
        <Button onClick={()=>handleGender('Female')}>Female</Button>
    </Box>

  </BodyContainer>
  )
}

export default GenderChoice