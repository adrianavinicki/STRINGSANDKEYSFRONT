const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export const BuyButtonNotification = async (user,detailCarrito) => {
  try {
    const userMail = user.email;
    const userName = user.nickname;
    const ordenCompra = detailCarrito

    const htmlContent = `
    <html>
      <body style="text-align: center;">
        <h1 style="color: black;">¡Gracias por tu compra, ${userName}!</h1>
        <p style="color: black;">Te agradecemos por tu reciente compra en Strings And Keys. Debajo puedes ver los detalles de tu compra:</p>
        <ul style="color: black; list-style: none">
          ${ordenCompra.map((e) => `<li>- ${e.name}</li>`).join("")}
        </ul>
        <img src="https://res.cloudinary.com/dhit7strk/image/upload/v1693428861/MAIL_p2qzg7.png" alt="Imagen de agradecimiento" style="display: block; margin: 0 auto;">
      </body>
    </html>
  `;
  

    const response = await fetch(`${VITE_LOCAL_HOST}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMail: userMail,
        titulo: `Gracias por tu compra ${userName}`,
        // contenido:
        //   `¡Te agradecemos por tu reciente compra en Strings And Keys!, Debajo podras ver los detalles de tu compra: ${ordenCompra.map(e=>(e.name))}`,
        contenido: htmlContent,
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
