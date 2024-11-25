import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../redux/slices/userSlice";
import { updateInfoUser } from "../firebase/helper/request";
import { NextButton } from "../style/styled_Mui";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";


interface ScrollSelectorProps {
  type: "height" | "weight" | "age";
  min: number;
  max: number;

}

const ScrollSelector: React.FC<ScrollSelectorProps> = ({ type, min, max }) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.currentUser.id)



  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleScroll = () => {

    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const itemHeight = 50; // Altura de cada elemento
      const index = Math.round(scrollTop / itemHeight);
      setCenterIndex(index);
    }
  };

  const handleNext = async () => {
    const selectedValue = values[centerIndex];
    console.log(selectedValue)
    const updates = { [type]: selectedValue };

    try {
      await updateInfoUser(userID, updates)
      dispatch(updateUser(updates))
    } catch (error) {
      console.error("Failed to update user:", error);
    }

    switch (type) {
      case 'height':
        navigate('/weightChoice')
        break;
      case 'weight':
        navigate('/ageChoice')
        break;
      case 'age':
        navigate('/genderChoice')
        break;

      default:
        break;
    }

  };

  return (
    <Box>
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          height: "150px",
          overflowY: "scroll",
          scrollbarWidth: "none", // Ocultar barra en Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Ocultar barra en Chrome
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {values.map((value, index) => (
            <Typography
              key={value}
              sx={{
                fontSize: index === centerIndex ? "24px" : "16px",
                color: index === centerIndex ? "white" : "gray",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {value}
            </Typography>
          ))}
        </Box>
      </Box>
      <NextButton variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
        Next
      </NextButton>
    </Box>
  );
};

export default ScrollSelector;
