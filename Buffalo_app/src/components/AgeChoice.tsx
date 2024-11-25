import { Box, Typography } from "@mui/material"
import { BodyContainer } from "../style/styled_Mui"
import Logo from '../assets/Logo.png'

import ScrollSelector from "./ScrollSelector"

const AgeChoice = () => {
  return (
    <BodyContainer>
    <Box>
      <img src={Logo} width={'170'} />
      <Typography color="#fff" variant="subtitle2">Enter your Age</Typography>
    </Box>

    <Box>
    <ScrollSelector type="age" min={12} max={120} />
    </Box>

  </BodyContainer>
  )
}

export default AgeChoice