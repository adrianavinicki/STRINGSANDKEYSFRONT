import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName, getProductNamePrice, setPage } from "../redux/actions";
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

  function handleKey(e) {
    if(e.key === "Enter"){
      dispatch(getProductName(name));
      dispatch(getProductNamePrice(name));
      setName("");
      dispatch(setPage(0));
      
    }
  }

  function handlerSubmit(e) {
    //e.preventDefault();
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
      <Flex align={'center'}>
        <Input
          w={"80%"}
          h={'5vh'}
          bg={"white"}
          color={"black"}
          mr={"2%"}
          placeholder="Busca tu Instrumento"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          onKeyDown={handleKey}
          onChange={(e) => {
            handlerInput(e);
          }}
          value={name}
        />
        {location.pathname != "/products" ? (
          <Link to={`/products?search=${encodeURIComponent(name)}`}>
            <Button
              bg={""}
              color={"black"}
              _placeholder={{ opacity: 1, color: "gray.500" }}
              onClick={(e) => handlerSubmit(e)}
              type="submit"
            >
              {<SearchIcon color="#ffa200" />}
            </Button>
          </Link>
        ) : (
          <Button
            bg={""}
            color={"black"}
            _placeholder={{ opacity: 1, color: "gray.500" }}
            onClick={(e) => handlerSubmit(e)}
            type="submit"
          >
            {<SearchIcon color="#ffa200" />}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default SearchBar;
