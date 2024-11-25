import { useState } from "react";
import InfoScreen from "./InfoScreen";

interface dataInfo{
imagen:string,
title:string,
description:string
}

const Info1 = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const totalScreens: number = 3; // Número total de pantallas

  const handleNext =()=>{
    setCurrentScreen(Math.min(currentScreen + 1, totalScreens -1))
    console.log(Math.min(currentScreen + 1, totalScreens -1))
  };
  const handlePrev =() =>{
    setCurrentScreen(Math.max(currentScreen-1, 0));
  }
  
  const screensData:dataInfo[] = [
   {imagen: 'https://res.cloudinary.com/dyrmx9oij/image/upload/v1732319163/Img_Bg1_t5esgz.png', title:'Workout', description:'Start training with usand build muscle or lose weight' },
   {imagen: 'https://res.cloudinary.com/dyrmx9oij/image/upload/v1732319163/Img_Bg2_dxjiia.png', title:'Discipline', description:'Develop discipline in yourself train every day'},
   {imagen: 'https://res.cloudinary.com/dyrmx9oij/image/upload/v1732319163/Img_Bg3_rujz08.png', title:'Сharacter', description:'Cultivate in you an iron character for training'}
  ]

  return (
    <div>
      <InfoScreen
      image={screensData[currentScreen].imagen}
      description={screensData[currentScreen].description}
      title={screensData[currentScreen].title}
      index= {currentScreen}
      totalScreens={totalScreens}
      handleNext={handleNext}
      handlePrev={handlePrev}
      />
    </div>
  )
}

export default Info1