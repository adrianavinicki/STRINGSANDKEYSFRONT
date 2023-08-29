import { Box, Flex } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useSelector } from "react-redux";


const RatingDisplay = ({ productId }) => {
    const ratingsAverage = useSelector((state)=>state.ratingsAverage);
    const productRating = ratingsAverage.filter(el=>el.productId==productId)
    const finalRate = productRating[0]?.averageRate;

  return (
    <Flex alignItems="center">
      {[...Array(5)].map((star, i) => {
        let starIcon;

        if (i < Math.floor(finalRate)) {
          starIcon = <BsStarFill />;
        } else if (i < Math.ceil(finalRate)) {
          starIcon = <BsStarHalf />;
        } else {
          starIcon = <BsStar />;
        }

        return (
          <Box cursor="pointer" key={i} ml={'0.3vh'}>
            {starIcon}
          </Box>
        );
      })}
    </Flex>
  );
};

export default RatingDisplay;