import { Button } from '@mui/material'
import { BodyContainer } from '../style/styled_Mui'
import { uploadExercises } from '../firebase/helper/request'

const UploadStores = () => {



  return (
    <BodyContainer>

    <Button onClick={()=>uploadExercises()}>submit Data exercises</Button>



  </BodyContainer>
  )
}

export default UploadStores