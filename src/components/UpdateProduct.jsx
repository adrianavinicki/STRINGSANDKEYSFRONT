import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Select,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetailProduct, cleanDetail, putProduct, getProducts } from "../redux/actions";
import { useToast } from "@chakra-ui/react";
import { brands, categories } from "../views/DashBoardAdmin/CreateProductoFolder/formData";

export default function ProductProfileEdit(features) /*: JSX.Element*/ {
  const dispatch = useDispatch();

  const detailProduct = useSelector((state) => state.details);

  const toast = useToast();

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    //creo un estado del form.
    name: "",
    brand: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
    // image:"",
    product_status: "",
  });

  const params = useParams();

  const productDetail = useSelector((state) => state.productDetail);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    try {
      if (update.name === "") {
        update.name = detailProduct.name;
      }
      if (update.brand === "") {
        update.brand = detailProduct.brand;
      }
      if (update.category === "") {
        update.category = detailProduct.category;
      }
      if (update.minimun_age === "") {
        update.minimun_age = detailProduct.minimun_age;
      }
      if (update.description === "") {
        update.description = detailProduct.description;
      }
      if (update.quantity === "") {
        update.quantity = detailProduct.quantity;
      }
      if (update.price === "") {
        update.price = detailProduct.price;
      }
      if (update.product_status === "") {
        update.product_status = detailProduct.product_status;
      }
      if (image === "") {
        setImage(detailProduct.image);
      }

      dispatch(putProduct(params.id, update));

      // e.preventDefault()

      toast({
        title: "Producto Actualizado",
        description: "El producto a sido actualizado con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setUpdate({
        name: "",
        brand: "",
        category: "",
        description: "",
        quantity: "",
        price: "",
        product_status: "",
      });

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     //dispatch(getProduct(params.id));
  //   }, [dispatch, params.id]);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailProduct(id));

    return () => {
      dispatch(cleanDetail());
      dispatch(getProducts());
    };
  }, [dispatch, id]);

  return (
    <Box>
      <Flex minH={"78vh"} align={"center"} justify={"center"}>
        <Stack
          w={"full"}
          maxW={"md"}
          bg={"black"}
          rounded={"5px"}
          boxShadow={"lg"}
          p={"2vh"}
          h={"75vh"}
        >
          <Heading color={'white'} mb={"1vh"} lineHeight={"1vh"} fontSize={"2vh"}>
            Modificar: ID {detailProduct?.id}
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="productName">
              <Stack direction={["column", "row"]} spacing={8}>
                <Center>
                  <Avatar
                    ml={"3vh"}
                    h={"8vh"}
                    w={""}
                    src={detailProduct?.image}
                  ></Avatar>
                </Center>
                <Center w="full">
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    value={update.image}
                    onChange={handleImageChange}
                    h={"4vh"}
                    fontSize={"1.8vh"}
                    color={'white'}
                    // onBlur={handleOnBlur}
                  ></Input>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="productName">
              <FormLabel color={'white'} fontSize={"1.8vh"}>
                Nombre Actual:{" "}
                <span style={{ color: "#ffa200" }}>{detailProduct?.name}</span>
              <Input
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Nuevo Nombre"
                _placeholder={{ color: "gray.600" }}
                type="text"
                name="name"
                value={update.name}
                onChange={handleChange}
                bg={"white"}
                color={"black"}
              />
              </FormLabel>
            </FormControl>
            <FormControl id="productCategory">
              <FormLabel color={'white'} fontSize={"1.8vh"}>
                Categoria Actual:{" "}
                <span style={{ color: "#ffa200" }}>
                  {detailProduct?.category}
                </span>
                <Select
                    h={'4vh'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    placeholder="seleccione una categoria"
                    name="category"
                    color={'black'}
                    value={update.category}
                    onChange={handleChange}
                  >
                    {categories.map((categoria, index) => (
                      <option value={categoria} key={index}>
                        {categoria}
                      </option>
                    ))}
                  </Select>
              {/* <Input
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Nueva Categoria"
                _placeholder={{ color: "gray.600" }}
                type="text"
                name="category"
                value={update.category}
                onChange={handleChange}
                bg={"white"}
                color={"black"}
              /> */}
              </FormLabel>
            </FormControl>
            <FormControl id="productBrand">
              <FormLabel color={'white'} fontSize={"1.8vh"}>
                Marca Actual:{" "}
                <span style={{ color: "#ffa200" }}>{detailProduct?.brand}</span>
                <Select
                    h={'4vh'}
                    _hover={"none"}
                    bg={"white"}
                    border={"2px solid black"}
                    placeholder="seleccione una marca"
                    name="brand"
                    color={'black'}
                    value={update.brand}
                    onChange={handleChange}
                  >
                    {brands.map((marca, index) => (
                      <option value={marca} key={index}>
                        {marca}
                      </option>
                    ))}
                  </Select>
              {/* <Input
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Nueva Marca"
                _placeholder={{ color: "gray.600" }}
                type="text"
                name="brand"
                value={update.brand}
                onChange={handleChange}
                bg={"white"}
                color={"black"}
              /> */}
              
              </FormLabel>
            </FormControl>
            <FormControl id="productPrice">
              <FormLabel color={'white'} fontSize={"1.8vh"}>
                Precio Actual:{" "}
                <span style={{ color: "#ffa200" }}>
                  ${detailProduct?.price}
                </span>
              <Input
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Nuevo Precio"
                _placeholder={{ color: "gray.600" }}
                type="number"
                name="price"
                value={update.price}
                onChange={handleChange}
                bg={"white"}
                color={"black"}
              />
              </FormLabel>
            </FormControl>
            <FormControl id="productQuantity">
              <FormLabel color={'white'} fontSize={"1.8vh"}>
                Stock Actual:{" "}
                <span style={{ color: "#ffa200" }}>
                  {detailProduct?.quantity}
                </span>
                <Input
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Nuevo Stock"
                _placeholder={{ color: "gray.600" }}
                type="number"
                name="quantity"
                value={update.quantity}
                onChange={handleChange}
                bg={"white"}
                color={"black"}
              />
              </FormLabel>
            </FormControl>
            <FormControl id="productCategory">
              <FormLabel color={'white'} fontSize={"1.8vh"}>Descripcion
              <Input
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Nueva Descripcion"
                _placeholder={{ color: "gray.600" }}
                type="text"
                name="description"
                value={update.description}
                onChange={handleChange}
                bg={"white"}
                color={"black"}
              />
              </FormLabel>
            </FormControl>
            <FormControl id="productCategory">
              <FormLabel color={useColorModeValue('white', 'white')} fontSize={"1.8vh"}>
                Estado:{" "}
                {detailProduct?.product_status === true ? (
                  <span style={{ color: "#ffa200" }}>Activo</span>
                ) : (
                  <span style={{ color: "#ffa200" }}>Pausado</span>
                )}
              <Select
                h={"4vh"}
                fontSize={"1.8vh"}
                placeholder="Cambiar Estado"
                _placeholder={{ color: "white", backgroundColor:'black' }}
                type="boolean"
                name="product_status"
                value={update.product_status}
                onChange={handleChange}
                bg={'white'}
                color={useColorModeValue('black', 'black')}
              >
                <option  value="True">Activar</option>
                <option  value="False">Pausar</option>
              </Select>
              </FormLabel>
            </FormControl>
            <Stack spacing={6} mt={"1vh"} direction={["column", "row"]}>
              <Link to={"/admin"}>
                <Button
                  bg={"#1b1b1b"}
                  color={"white"}
                  w="full"
                  h={"4vh"}
                  fontSize={"1.8vh"}
                >
                  Volver
                </Button>
              </Link>
              <Button
                type="submit"
                bg={"#ffa200"}
                color={"black"}
                w="full"
                onSubmit={handleSubmit}
                _hover={"none"}
                h={"4vh"}
                fontSize={"1.8vh"}
              >
                Guardar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}
