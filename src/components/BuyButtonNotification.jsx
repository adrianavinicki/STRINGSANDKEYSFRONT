const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export const BuyButtonNotification = async (user,detailCarrito) => {
  try {
    const userMail = user.email;
    const userName = user.nickname;
    const ordenCompra = detailCarrito

    const response = await fetch(`${VITE_LOCAL_HOST}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMail: userMail,
        titulo: `Gracias por tu compra ${userName}`,
        contenido:
          `¡Te agradecemos por tu reciente compra en Strings And Keys!, Debajo podras ver los detalles de tu compra: ${ordenCompra.map(e=>(e.name))}`,
      }),
    });
    if (response.ok) {
      console.log("Email Enviado", response);
      // Mostrar una notificación de éxito
    } else {
      console.error("Error al enviar el correo");
      // Mostrar una notificación de error
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
