import * as xlsx from "xlsx";

 function generate(data){

    const dataFinal = data.map(datos => {
        return {
            id: datos.id,
            nombre_cliente: datos.user.first_name + " " + datos.user.last_name,
            compra_total: "$ " + parseFloat(datos.totalprice),
            fecha_compra: datos.payment ? datos.payment.purchase_date: "2023",
            estatus_compra: datos.purchase_status,
            detalle_articulos: datos.orderdetails.map(articulos => {
                return "- " + articulos.product.name;
            }).join(", "),
            cantidad: datos.orderdetails.map(articulos => {
                return articulos.quantity;
            }).join(", "),
            precio_articulo: datos.orderdetails.map(articulos => {
                return "$ " + parseFloat(articulos.price);
            }).join(", "),

        }
    })

    console.log(dataFinal)
    const excelData = xlsx.utils.json_to_sheet(dataFinal);

    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, excelData, 'Sheet1');

    xlsx.writeFile(wb, "data.xlsx");

    return wb;
}

export default generate;