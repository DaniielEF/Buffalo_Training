import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { BodyContainer, NextButton } from '../style/styled_Mui';
import { useNavigate } from 'react-router-dom';

interface InfoScreenProps {
  image: string;
  description: string;
  title: string;
  index: number;
  totalScreens: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const InfoScreen: React.FC<InfoScreenProps>= ({ image, description,title, index, totalScreens, handleNext, handlePrev }) => {
    const [activeDot, setActiveDot] = useState(index)

    const navigate = useNavigate()

    const handleDotClick = (dotIndex:number) => {    
      if (dotIndex < activeDot) {
        handlePrev();
        console.log('prev')
      } 
    };

    useEffect(() => {
      setActiveDot(index)
    }, [index])
    


  return (
    <BodyContainer>
      <img src={image} alt='Info image'/>
      <Typography>{title}</Typography>
      <Typography>{description}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={()=>handlePrev()}>
        </IconButton>
      <Box sx={{ display: 'flex' }}>
        { Array.from({length:totalScreens}).map((_,i)=>(
          <IconButton
          key={i}
          onClick={()=>handleDotClick(i)}
          sx={{
            width: activeDot === i ? 40 : 10, // Ajusta el ancho según tu preferencia
            height: 10,
            borderRadius: activeDot === i ? '35%' :'50%',
            backgroundColor: activeDot === i ? '#2BE7E8' : '#2BE7E8',
            margin: 0.5,
          }}
          >
            <MoreVertIcon style={{ display: 'none' }}/>
          </IconButton>
        ))
        }
      </Box>   
      <div></div>   
      </Box>
      <Box>
        {
          index<(totalScreens-1)?
          (<NextButton fullWidth onClick={()=>handleNext()}>Next</NextButton>) 
          :(<NextButton fullWidth onClick={()=>navigate('/login')}>Registration</NextButton>)
        }
      </Box>
    </BodyContainer>
  )
}

export default InfoScreen