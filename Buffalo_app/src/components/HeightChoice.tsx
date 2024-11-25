import { Box, Typography } from "@mui/material"
import { BodyContainer } from "../style/styled_Mui"
import Logo from '../assets/Logo.png'

import ScrollSelector from "./ScrollSelector"



const HeightChoice = () => {




  return (
    <BodyContainer>
      <Box>
        <img src={Logo} width={'170'} />
        <Typography color="#fff" variant="subtitle2">Enter your Height</Typography>
      </Box>

      <Box>
      <ScrollSelector type="height" min={100} max={250} />
      </Box>

    </BodyContainer>
  )
}

export default HeightChoice