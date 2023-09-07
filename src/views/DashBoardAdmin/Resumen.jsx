import React from "react";
import {
  Box,
  chakra,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { ventas } from "../DashBoardAdmin/Stats/ventas";
import ChartStats from "../../components/ChartStats";
import { BsCashCoin } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInfoPurchase } from '../../redux/actions'
//import { getAllUsers, getAllOrders, getAllDetailOrders } from '../redux/actions';

const CustomTooltip = ({ active, label, payload }) => {
  if (active) {
    return (
      <Box p={2} borderWidth="1px" borderColor="#ffa200" borderRadius="md" backgroundColor="black">
        <Text color={'white'} className="label">{`Mes: ${label}`}</Text>
        <Text color={'white'}  className="sales">{`Valor: ${payload[0].value.toLocaleString()}`}</Text>
      </Box>
    );
  }
  return null;
};

const CustomYAxisTick = ({ x, y, payload }) => {
  // Formatea el valor usando .toLocaleString()
  const formattedValue = payload.value.toLocaleString();

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" >{formattedValue}</text>
    </g>
  );
};

function StatsCard(props /*StatsCardProps*/) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={'3vh'}
      py={"2vh"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"white"}
      rounded={"lg"}
      h={"15vh"}
      w={'100%'}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={'2vh'}>
          <StatLabel fontWeight={"medium"} isTruncated color={"white"}>
            {title}
          </StatLabel>
          <StatNumber fontSize={"4vh"} fontWeight={"medium"} color={"white"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={"#ffa200"}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {


  const users = useSelector((state) => state.allUsers);
  const purchases = useSelector((state) => state.currentPurchases)

  const totalPrice = purchases.reduce((total, item) => total + parseInt(item.totalprice), 0);

  //console.log("purchases", purchases);

  const formattedPrice = `$${totalPrice.toLocaleString('es-ES')}`;

  const mesesEnEspañol = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción "getAllPurchases" aquí
    dispatch(getInfoPurchase());
  }, [dispatch]);

  const ventaBDD = useSelector((state) => state.dataStats.data.purchasess);

  //console.log("Datos desde la BDD", ventaBDD);

  const alldata = [];

  ventaBDD.map(e => {
    if (e.orderdetails.length > 1) {
      e.orderdetails.map(f => {
        const dateCatPrice = {
          order_date: f.order_date,
          category: f.product.category,
          price: f.product.price * f.quantity
        };
        alldata.push(dateCatPrice)
      })
    }
  })
  //console.log(alldata)

  const valoresXmesConAnio = alldata.reduce((acumulador, objeto) => {
    const fecha = new Date(objeto.order_date);
    const mes = fecha.toLocaleString('default', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
    const year = fecha.getFullYear(); // Año
    const precio = objeto.price;

    const registroExistente = acumulador.find((item) => item.year === year && item.month === mes);

    if (registroExistente) {
      registroExistente.price += precio;
    } else {
      acumulador.push({ year, month: mes, price: precio });
    }

    return acumulador;
  }, []);

  //console.log(valoresXmesConAnio);

  const categoriasAgrupadas = alldata.reduce((resultado, objeto) => {
    const fecha = new Date(objeto.order_date);
    const mes = fecha.toLocaleString('default', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
    const year = fecha.getFullYear(); // Año
    const categoria = objeto.category;
    const precio = objeto.price;

    const clave = `${year}-${mes}`;

    if (!resultado[clave]) {
      resultado[clave] = {
        year,
        month: mes,
        price: 0, // Inicializar price en 0
        Afina: 0,
        Corre: 0,
        Fund: 0,
        Puas: 0,
        Cabl: 0,
        Tecl: 0,
        Cuer: 0,
        Vien: 0,
        Amp: 0,
        Perc: 0,
      };
    }

    // Asignar el precio a la categoría correspondiente
    switch (categoria) {
      case 'Afinadores':
        resultado[clave].Afina += precio;
        break;
      case 'Correas':
        resultado[clave].Corre += precio;
        break;
      case 'Fundas':
        resultado[clave].Fund += precio;
        break;
      case 'Puas':
        resultado[clave].Puas += precio;
        break;
      case 'Cables':
        resultado[clave].Cabl += precio;
        break;
      case 'Teclados':
        resultado[clave].Tecl += precio;
        break;
      case 'Cuerdas':
        resultado[clave].Cuer += precio;
        break;
      case 'Vientos':
        resultado[clave].Vien += precio;
        break;
      case 'Amplificadores':
        resultado[clave].Amp += precio;
        break;
      case 'Percusion':
        resultado[clave].Perc += precio;
        break;
      default:
        break;
    }

    // Sumar el precio total para esta clave (año y mes)
    resultado[clave].price += precio;

    return resultado;
  }, {});

  // Convertir el objeto en un array de objetos
  const categoriasAgrupadasArray = Object.values(categoriasAgrupadas);

  //categoriasAgrupadasArray.reverse();

  const combinedData = [...ventas, ...categoriasAgrupadasArray];

  //console.log(combinedData);

  const handleStats = () => {
    setAdminView("Stats");
    //console.log(adminView, "adminView");
  };

  return (
    <Box h={"25vh"} borderBottom="1px solid #ffa200" >
      <Box
        maxW="7xl"
        mx={"auto"}
        mt={"5%"}
        bg={""}
        px={{ base: 2, sm: 12, md: 17 }}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'3vh'}>
          <StatsCard
            title={"Usuarios"}
            stat={users?.length}
            icon={<BsPerson size={"8vh"} />}
          />
          <StatsCard
            title={"Ventas"}
            stat={purchases?.length}
            icon={<BsCartCheck size={"8vh"} />}
          />
          <StatsCard
            title={"Ingresos Totales"}
            stat={formattedPrice}
            icon={<BsCashCoin size={"8vh"} />}
          />
        </SimpleGrid>
      </Box>
      {/* Generales */}
      <Box bg={''} mt={'15vh'} textAlign="center">
        <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
          Ventas Generales
        </Heading>
        <Box width="100%">
      <Flex justify="center">
        <ResponsiveContainer width={'80%'} height="100%" aspect={4}>
          <BarChart data={combinedData} barSize={20} margin={{ left: 15 }}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#FFFFFF" strokeDasharray="4"/>
            <XAxis stroke="#FFFFFF" dataKey="month" />
            <YAxis
              tickFormatter={(value) => value.toLocaleString()}
              domain={[0, 'auto']} stroke="#FFFFFF"
            />

            <Bar dataKey="price" fill="#ffa200" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Box>
      </Box>
    </Box>

  );
}
