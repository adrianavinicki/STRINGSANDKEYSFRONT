
const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export const handleSendEmail = async (user) => {

  try {
    const userMail = user.email
    const userName = user.nickname

    const response = await fetch(`${VITE_LOCAL_HOST}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMail: userMail,
        titulo: `Felicidades por registrarte ${userName}`,
        contenido: `Te damos la bienvenida a Strings And Keys. ¡Tu registro fue exitoso!`,
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


