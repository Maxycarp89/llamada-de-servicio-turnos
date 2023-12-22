import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_USER_MAILING,
    pass: process.env.NODE_PASSWORD_MAILING,
  },
});

export const sendMail = async (data) => {
  const {
    Subject,
    ItemDescription,
    ItemCode,
    Description,
    BPeMail,
    CustomerName,
  } = data;
  await transporter
    .sendMail({
      from: "yuhmaksito@gmail.com",
      to: BPeMail,
      subject: "Llamada de Servicio - YUHMAK",
      html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          p,
          a,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: "Roboto", sans-serif !important;
          }
          h1 {
            font-size: 30px !important;
          }
          h2 {
            font-size: 25px !important;
          }
          h3 {
            font-size: 18px !important;
          }
          h4 {
            font-size: 16px !important;
          }
          p,
          a {
            font-size: 15px !important;
          }
    
          .claseBoton {
            width: 30%;
            background-color: #00A541;
            border: 2px solid #00A541;
            color: black;
            padding: 16px 32px;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            transition-duration: 0.4s;
            cursor: pointer;
          }
          .claseBoton:hover {
            background-color: #000000;
            color: #ffffff;
          }
          .imag {
            width: 20px;
            height: 20px;
          }
          .contA {
            margin: 0px 5px 0 5px;
            width: 18px;
          }
          .afooter {
            color: #ffffff !important;
            text-decoration: none;
            font-size: 13px !important;
          }
          .subtext{
            color: #00A541
          }
        </style>
      </head>
      <body>
        <div style="width: 100%; background-color: #e3e3e3">
          <div style="padding: 20px 10px 20px 10px">
            <div
              style="
                background-color: #000000;
                padding: 10px 0px 10px 0px;
                width: 100%;
                text-align: center;
              "
            >
              <img
                src="cid:grupoyuhmak"
                alt="grupo-yuhmak"
                style="width: 100%"
              />
            </div>
            <div
              style="
                background-color: #ffffff;
                padding: 20px 0px 5px 0px;
                width: 100%;
                text-align: center;
              "
            >
              <h1 class="subtext">Llamada de Servicio <br/> YUHMAK</h1>
              <p class="texting">
              Buenos días ${CustomerName} se le notifica de parte del equipo Yuhmak que se dio de alta una llamada de servicio a la moto: ${ItemDescription} con el código ${ItemCode} con el siguiente asunto: <strong>"${Subject}"</strong> y motivo: <strong>${Description}</strong></span>.<br/> <span>Pronto será notificado nuevamente con los avances de la misma!. Saludos.
              </p>
              <p class="subtext">Gracias por tu tiempo.</p>
              <p style="margin-bottom: 50px" class="subtext">
                <i>Atentamente:</i><br />Equipo Yuhmak Service
              </p>
              <a class="claseBoton" href="https://grupoyuhmak.com">Yuhmak</a>
            </div>
            <div
              style="
                background-color: #fafafa;
                color: #ffffff;
                padding: 5px 0px 0px 0px;
                width: 100%;
                text-align: center;
              "
            >
              <!-- Redes sociales -->
              <a href="https://www.facebook.com/yuhmakmotos/" class="contA"
                ><img src="cid:fb" class="imag"
              /></a>
              <a href="https://www.instagram.com/grupoyuhmak/" class="contA"
                ><img src="cid:ig" class="imag"
              /></a>
              <a href="https://wa.me/5491152548398" class="contA"
                ><img src="cid:wapp" class="imag"
              /></a>
              <a href="mailto:ventas@yuhmak.com.ar" class="contA"
                ><img src="cid:em" class="imag"
              /></a>
              <p
                style="
                  background-color: black;
                  padding: 10px 0px 10px 0px;
                  font-size: 12px !important;
                "
              >
                © 2023 Yuhmak, todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
      attachments: [
        {
          filename: "fb.png",
          path: "./public/images/fb.png",
          cid: "fb",
        },
        {
          filename: "ig.png",
          path: "./public/images/ig.png",
          cid: "ig",
        },
        {
          filename: "wapp.png",
          path: "./public/images/wapp.png",
          cid: "wapp",
        },
        {
          filename: "em.png",
          path: "./public/images/em.png",
          cid: "em",
        },
        {
          filename: "grupoyuhmak.jpeg",
          path: "./public/images/grupoyuhmak.jpeg",
          cid: "grupoyuhmak",
        },
      ],
    })
    .then(() => console.log(""));
};

export const sendMailWarranty = async (email) => {
  await transporter
    .sendMail({
      from: "yuhmaksito@gmail.com",
      to: email,
      subject: "Llamada de Servicio - YUHMAK",
      html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          p,
          a,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: "Roboto", sans-serif !important;
          }
          h1 {
            font-size: 30px !important;
          }
          h2 {
            font-size: 25px !important;
          }
          h3 {
            font-size: 18px !important;
          }
          h4 {
            font-size: 16px !important;
          }
          p,
          a {
            font-size: 15px !important;
          }
    
          .claseBoton {
            width: 30%;
            background-color: #00A541;
            border: 2px solid #00A541;
            color: black;
            padding: 16px 32px;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            transition-duration: 0.4s;
            cursor: pointer;
          }
          .claseBoton:hover {
            background-color: #000000;
            color: #ffffff;
          }
          .imag {
            width: 20px;
            height: 20px;
          }
          .contA {
            margin: 0px 5px 0 5px;
            width: 18px;
          }
          .afooter {
            color: #ffffff !important;
            text-decoration: none;
            font-size: 13px !important;
          }
          .texting{
            color: #fafafa
          }
          .subtext{
            color: #00A541
          }
        </style>
      </head>
      <body>
        <div style="width: 100%; background-color: #e3e3e3">
          <div style="padding: 20px 10px 20px 10px">
            <div
              style="
                background-color: #000000;
                padding: 10px 0px 10px 0px;
                width: 100%;
                text-align: center;
              "
            >
              <img
                src="cid:grupoyuhmak"
                alt="grupo-yuhmak"
                style="width: 100%"
              />
            </div>
            <div
              style="
                background-color: #ffffff;
                padding: 20px 0px 5px 0px;
                width: 100%;
                text-align: center;
              "
            >
              <h1 class="subtext">Llamada de Servicio - GARANTÍA<br/> YUHMAK</h1>
              <p class="texting">
              Se abrió una llamada de servicio de tipo GARANTÍA, recuerda que de momento esta en proceso de testing. Podras verla ingresando a la página: <a class="claseBoton" href="http://testingv.yuhmak.com">http://testingv.yuhmak.com</a>
              </p>
              <p class="texting">
              Podras verla ingresando a la sección Dashboard -> Garantía. En dicha sección podrás ver los servicios realizados por garantía.
              </p>
              <p class="subtext">Gracias por tu tiempo. Saludos.</p>
              <p style="margin-bottom: 50px" class="subtext">
                <i>Atentamente:</i><br />Equipo Yuhmak Service
              </p>
              <a class="claseBoton" href="https://grupoyuhmak.com">Yuhmak</a>
            </div>
            <div
              style="
                background-color: #fafafa;
                color: #ffffff;
                padding: 5px 0px 0px 0px;
                width: 100%;
                text-align: center;
              "
            >
              <p
                style="
                  background-color: black;
                  padding: 10px 0px 10px 0px;
                  font-size: 12px !important;
                "
              >
                © 2023 Yuhmak, todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
      attachments: [
        {
          filename: "fb.png",
          path: "./public/images/fb.png",
          cid: "fb",
        },
        {
          filename: "ig.png",
          path: "./public/images/ig.png",
          cid: "ig",
        },
        {
          filename: "wapp.png",
          path: "./public/images/wapp.png",
          cid: "wapp",
        },
        {
          filename: "em.png",
          path: "./public/images/em.png",
          cid: "em",
        },
        {
          filename: "grupoyuhmak.jpeg",
          path: "./public/images/grupoyuhmak.jpeg",
          cid: "grupoyuhmak",
        },
      ],
    })
    .then(() => console.log(""));
};

transporter.verify(() => console.log("Ready for send Email"));
