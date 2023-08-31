
const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export const handleSendEmail = async (user) => {

  try {
    const userMail = user.email
    const userName = user.nickname

    const htmlContent = `
    <html>
      <body style="text-align: center;">
        <h1 style="color: black;">¡Felicidades por registrarte ${userName}!</h1>
        <img src="https://res.cloudinary.com/dhit7strk/image/upload/v1693429374/MAIL_2_pyl5ik.png" alt="Imagen de Bienvenida">
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
        titulo: `Felicidades por registrarte ${userName}`,
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
    // Mostrar una notificación de error
  }
};


