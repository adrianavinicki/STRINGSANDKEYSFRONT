import axios from "axios";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { brands, categories } from "./formData";
import { PostProduct } from "../../../redux/actions";
import WithSubnavigation from "../../../components/NavBar";
import SmallWithLogoLeft from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

export default function CreateProduct() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
    //image
  });

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  const validateForm = (form, image) => {

    let errors = {};
    if(!form.name.trim()) errors.name = 'Nombre requerido';
    if(!form.brand) errors.brand = 'Marca requerida';
    if(!form.category) errors.category = 'Categoria requerida';
    if(!form.description) errors.description = 'Descripcion requerida';
    if(!form.quantity) errors.quantity = 'Cantidad requerida';
    if(form.quantity < 0) errors.quantity = 'La cantidad no puede ser menor a 0';
    if(!form.price) errors.price = 'Precio requerida';
    if(form.price < 0) errors.price = 'El precio no puede ser menor a 0';
    if(!image) errors.image = "Imagen de producto requerida";
    if (image && !image.type.startsWith('image/')) errors.image = 'Formato de imagen no valido'

    return errors; 
 };

 const handleOnBlur = (e) => {
  handleChange(e);
  setErrors(validateForm(form, image));       
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const error = validateForm(form, file);
    setErrors(error);

  };

  const handleNumbersChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setForm((prevState) => ({ ...prevState, [name]: value }));
    console.log(name);
    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //if(!image) {
    //    alert("no hay imagen");
    //    return;
    //}
    try {
      const postData = new FormData();
      postData.append("name", form.name);
      postData.append("brand", form.brand);
      postData.append("category", form.category);
      postData.append("description", form.description);
      postData.append("quantity", form.quantity);
      postData.append("price", form.price);
      postData.append("image", image);

      //console.log(image);

      dispatch(PostProduct(postData));

      toast({
        title: "Producto Creado",
        description: "El Producto a sido creado con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate('/admin/edit');

      //setImage(null);

      // setForm({
      // name:"",
      // brand:"",
      // category:"",
      // description:"",
      // quantity:"",
      // price:"",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box h={"100px"}>
        <WithSubnavigation></WithSubnavigation>
      </Box>
      <Box
        backgroundImage="url('/bg.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        w={"100%"}
        h={"83vh"}
        overflow={"hidden"}
      >
        <VStack h={"80vh"} mt={'1%'}>
          <Heading color={"black"} fontSize={"4vh"}>
            Crear Producto
          </Heading>
          {/* {console.log(form, image)} */}
          <Flex direction="column" align={"center"} w={'30%'} h={'65vh'} rounded={'5px'} color={"black"} bg={"rgba(0, 0, 0, 0.7)"} pt={'1vh'}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Flex direction="column" align={"center"}>
                  <FormLabel h={'2vh'} color={"#ffa200"}>Nombre:</FormLabel>
                  <Input
                  h={'5vh'}
                  w={'20vw'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                  />
                  {errors.name && <Text color={'red'} fontSize={'1.5vh'} >{errors.name}</Text>}
                  <FormLabel h={'2vh'} color={"#ffa200"}>Marca:</FormLabel>
                  <Select
                    h={'5vh'}
                    w={'20vw'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    placeholder="seleccione una marca"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                  >
                    {brands.map((marca, index) => (
                      <option value={marca} key={index}>
                        {marca}
                      </option>
                    ))}
                  </Select>
                  {errors.brand && <Text color={'red'} fontSize={'1.5vh'} >{errors.brand}</Text>}
                  <FormLabel h={'2vh'} color={"#ffa200"}>Categoria:</FormLabel>
                  <Select
                    h={'5vh'}
                    w={'20vw'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    placeholder="seleccione una categoria"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                  >
                    {categories.map((categoria, index) => (
                      <option value={categoria} key={index}>
                        {categoria}
                      </option>
                    ))}
                  </Select>
                  {errors.category && <Text color={'red'} fontSize={'1.5vh'} >{errors.category}</Text>}
                  <FormLabel h={'2vh'} color={"#ffa200"}>Descripcion Del Producto:</FormLabel>
                  <Input
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                    h={'5vh'}
                    w={'20vw'}
                  />
                  {errors.description && <Text color={'red'} fontSize={'1.5vh'} >{errors.description}</Text>}
                  <FormLabel h={'2vh'} color={"#ffa200"}>Cantidad:</FormLabel>
                  <Input
                  h={'5vh'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    min={0}
                    name="quantity"
                    value={form.quantity}
                    w={'20vw'}
                    onChange={
                      (value) =>
                        handleNumbersChange(value, "quantity") /*handleChange*/
                    }
                    onBlur={handleOnBlur}
                  />
                  {errors.quantity && <Text color={'red'} fontSize={'1.5vh'} >{errors.quantity}</Text>}
                  <FormLabel h={'2vh'} color={"#ffa200"}>Precio:</FormLabel>
                  <Input
                  h={'5vh'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    min={0}
                    name="price"
                    value={form.price}
                    w={'20vw'}
                    onChange={
                      (value) =>
                        handleNumbersChange(value, "price") /*handleChange*/
                    }
                  />
                  {errors.price && <Text color={'red'} fontSize={'1.5vh'} >{errors.price}</Text>}
                  <FormLabel h={'2vh'} htmlFor="image" color={"#ffa200"}> Imagen:</FormLabel>
                  <Input
                  h={'5vh'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    type="file"
                    id="image"
                    name="image"
                    w={'20vw'}
                    onChange={handleImageChange}
                  />
                  {errors.image && <Text color={'red'} fontSize={'1.5vh'} >{errors.image}</Text>}
                  <Box pt={'1vh'}>
                    <Flex>
                      <Link to={"/admin"}>
                        <Button h={'4vh'} _hover={"none"} color={"#ffa200"} bg={"black"}>
                          Volver
                        </Button>
                      </Link>
                      <Button
                      h={'4vh'} 
                      ml={'3%'}
                        _hover={"none"}
                        color={"black"}
                        bg={"#ffa200"}
                        type="submit"
                        isDisabled={Object.keys(errors).length || form.name=== '' || form.brand === ''}
                      >
                        Crear Producto
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </FormControl>
            </form>
          </Flex>
        </VStack>
      </Box>
      <Box>
        <SmallWithLogoLeft></SmallWithLogoLeft>
      </Box>
    </Box>
  );
}
