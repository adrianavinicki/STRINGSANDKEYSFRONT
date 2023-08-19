import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName, getProductNamePrice } from "../redux/actions";
import { Input, Box, Button, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MdGraphicEq } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const location = useLocation();

  function handlerInput(e) {
    const searchInput = e.target.value;
    setName(searchInput);
    //dispatch(getProductName(searchInput));
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getProductName(name));
    dispatch(getProductNamePrice(name));
    setName("");
    // if (location.pathname != "/products") {
    //   window.location.href = `/products?search=${encodeURIComponent(name)}`;
    // }
    dispatch(setPage(0));
  }

  return (
    <Box>
      <Flex>
        <Input
          w={"80%"}
          bg={"white"}
          color={"black"}
          mr={"2%"}
          placeholder="Busca tu Instrumento"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          onChange={(e) => {
            handlerInput(e);
          }}
          value={name}
        />
        {
          location.pathname != "/products"?
          (
            <Button
            bg={""}
            color={"black"}
            _placeholder={{ opacity: 1, color: "gray.500" }}
            onClick={(e) => handlerSubmit(e)}
            type="submit"
          >
            <Link to={`/products?search=${encodeURIComponent(name)}`}>
              <Box
                pt={'20%'}
                w={'40px'}
                h={'6vh'}
              >
              {<SearchIcon color="#ffa200" />}
              </Box>
            </Link>
          </Button>
          ):(
            <Button
            bg={""}
            color={"black"}
            _placeholder={{ opacity: 1, color: "gray.500" }}
            onClick={(e) => handlerSubmit(e)}
            type="submit"
          >
            {<SearchIcon color="#ffa200" />}
          </Button>
          )
        }
      </Flex>
    </Box>
  );
};

export default SearchBar;
