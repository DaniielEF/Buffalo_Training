import { Box, Button, Container, Stack, styled, TextField, Typography } from "@mui/material";

export const BodyContainer = styled(Container)({
  width: '100vw',
  minHeight:'100vh',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1F233E',
},
  {
    '& MuiContainer-root': {
      margin: '0',
      gap: '0'
    }
  })

export const NextButton = styled(Button)({
  width: '80vw',
  height: '2.5rem',
  borderRadius: '30px',
  backgroundColor: '#2BE7E8',
  margin: '0.5',
  color: '#fff',
})

export const TextInput = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '30px',
  },

  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    color: 'e0e4e9',
  },
  '& .MuiInputLabel-root': {
    color: '#FFFFFF',

  },
})

export const StackAuth = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '10px', /* Reducir el espacio entre íconos */
  '& .MuiSvgIcon-root': {
    fontSize: '3rem'
  }
})

export const ScrollContainer = styled(Box)(({ theme }) => ({
  height: '200px',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
}));

export const Item = styled(Typography)(({ theme }) => ({
  margin: '10px 0',
  transition: 'color 0.3s, transform 0.3s',
  fontSize: '1.5rem',
}));

export const CentralItem = styled(Typography)(({ theme }) => ({
  margin: '10px 0',
  color: 'white',
  fontSize: '2rem',
}));