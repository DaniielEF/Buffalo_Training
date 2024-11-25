import { Box, Typography } from "@mui/material"
import { BodyContainer } from "../style/styled_Mui"
import Logo from '../assets/Logo.png'

import ScrollSelector from "./ScrollSelector"

const WeightChoice = () => {
  return (
    <BodyContainer>
    <Box>
      <img src={Logo} width={'170'} />
      <Typography color="#fff" variant="subtitle2">Enter your Weight</Typography>
    </Box>

    <Box>
    <ScrollSelector type="weight" min={45} max={200} />
    </Box>

  </BodyContainer>
  )
}

export default WeightChoice