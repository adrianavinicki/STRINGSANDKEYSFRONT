import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ ratingValue, numRatings, handleRatingClick }) => {
  const [hoverRating, setHoverRating] = useState(0);
  //console.log(hoverRating);
  const renderStars = (ratingValue) => {

    return Array(5)
      .fill("")
      .map((_, i) => {
        let starColor = "black";
        let starBorderColor = "black";
        if (hoverRating >= i + 1) {
          starColor = "gray.300";}
        return (
          <Box
            key={i}
            ml={1}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRatingClick(i + 1)}
            cursor='pointer'
          >
            {ratingValue - i >= 1 ? (
              <BsStarFill color="white" style={{ marginLeft: "1" }} />
            ) : ratingValue - i === 0.5 ? (
              <BsStarHalf color="white" style={{ marginLeft: "1" }} />
            ) : (
              <BsStar color="white" style={{ marginLeft: "1" }} />
            )}
          </Box>
        );
      });
  };

  return (
    <Flex alignItems="center">
      {renderStars(ratingValue)}
      <Text ml={2} fontSize="sm" color="#ffa200">
        ({numRatings} Ratings)
      </Text>
    </Flex>
  );
};



export default Rating;