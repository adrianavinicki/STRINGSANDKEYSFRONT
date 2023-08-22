import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { FiGift } from 'react-icons/fi'
  
  export const CartProductMeta = (props) => {
    const { isGiftWrapping = true, image, name, description } = props

    const truncatedDescription = props.description.length > 50 ? `${props.description.substring(0, 80)}...` : props.description;

    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          height="15vh"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text color={'white'} fontWeight="medium">{name}</Text>
            <Text color={'white'} fontSize="sm">
              {truncatedDescription}
            </Text>
          </Stack>
        </Box>
      </Stack>
    )
  }