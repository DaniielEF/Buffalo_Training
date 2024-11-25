import { BodyContainer } from "../style/styled_Mui"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { getExercises } from "../firebase/helper/request";
import { Exercise } from "./helper/interfaces";
import { AppBar, Avatar, Box, Card, CardContent,  Chip,  IconButton, Toolbar, Typography } from '@mui/material';
import { RootState } from "../redux/store";
import advice_card from '../assets/advice_cards.png'
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';



const Home = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All Body")
  const [filterList, setFilterList] = useState<Exercise[]>([])
  const navigate = useNavigate()

  const currentUser = useSelector((state: RootState) => state.currentUser)
  console.log(currentUser)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getExercises();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setExercises(result);
      } catch (error) {
        console.error("Error get Products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem('currentUser');
      navigate('/login')
  };

  useEffect(() => {
    const exerciseArray = exercises.filter((exercise)=>exercise.muscle === selectedMuscle)
    setFilterList(exerciseArray)
  }, [selectedMuscle])
  

  return (
    <BodyContainer>
      <div>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Avatar
                alt="Remy Sharp"
                src={currentUser.photoUrl}
                sx={{ width: 56, height: 56 }}
              />
            </IconButton>
            <Box sx={{display:'flex', flexDirection:'column'}}>
            <Typography variant="body1" style={{ flexGrow: 1 }}>
              Hi
            </Typography>
            <Typography variant="body1" style={{ flexGrow: 1 }}>
              {currentUser.name}
            </Typography>
            </Box>
            <LogoutIcon onClick={handleLogout} sx={{cursor:'pointer'}}/>
          </Toolbar>
        </AppBar>

        <div style={{ textAlign: 'center', padding: '16px' }}>
          <img src={advice_card} alt="Special Menu" style={{ width: '100%', borderRadius: '8px' }} />
        </div>

        {/* Chips de categorías  */}
        <div className="chip-container">
          {["All Body", "Triceps", "Biceps", "Chest", "Back", "Quads","Hamstrings"].map((label) => (
            <Chip
              key={label}
              label={label}
              className="chip"
              onClick={() => setSelectedMuscle(label)}
              style={{
                backgroundColor: selectedMuscle === label ? "#2be7e8" : "#2e3562",
                color: selectedMuscle === label ? "black" : "white",
              }}
            />
          ))}
        </div>

        
        <div style={{ padding: '16px' }}>
          {filterList.length > 0 ? (
            filterList.map((exercise, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <Card style={{ display: 'flex', alignItems: 'center', backgroundColor:'grey'  }}>
                  <NavLink to={`/details/${exercise.id}`}>
                  </NavLink>
                  <CardContent style={{ flex: '1' }}>
                    <Typography variant="h6">{exercise.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                    intensity {exercise.intensity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                     Sets {exercise.sets}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Time {exercise.time}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary">
              No se encontraron exercisees.
            </Typography>
          )}
        </div>
      </div>

    </BodyContainer>
  )
}

export default Home