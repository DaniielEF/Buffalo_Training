import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'

const Dashboard = () => {
  return (
    <Routes>
        <Route path='/home' element={<Home/>} />
    </Routes>

  )
}

export default Dashboard