import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const user = useSelector((store:any) => store.currentUser)

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={user?.photoURL}
      title={user?.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user?.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {user?.email}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default UserInfo