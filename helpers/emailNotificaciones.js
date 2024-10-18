import nodemailer from "nodemailer"
import CorreosNotificacion from "../models/CorreosNotificacion.js"

const emailNotificaciones = async (datos) => {

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port:  process.env.EMAIL_PORT,
      auth: {
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS,
      }
    });

    

      const {des, fecha, tipo_alerta, cat_alerta, patente, origen, transportista} = datos
    
      const correos = []

      if(origen == "GPS" ){
      correos = await CorreosNotificacion.findAll({
          where: {
            id_notificacion : cat_alerta, 
            id_transportista : transportista
          }
        })       
      }


      const info = await transport.sendMail({
        from : "ALERTA - IdFleet",
        to: origen == "Tablet" ? "nestor.abello.escobar@gmail.com": "" ,
        subject : `Alerta de ${tipo_alerta}`,
        text : `Alerta de ${tipo_alerta}`,  

      html: 
    ` <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#314B70">
    <tbody><tr>
     <td valign="top" style="padding:0;Margin:0">
      <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
        <tbody><tr>
         <td align="center" style="padding:0;Margin:0">
          <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" background="https://qlwwtg.stripocdn.email/content/guids/CABINET_dd9759b09de82ede623cff0b42f718ca19c0a4f85f6337f81c705fd693708d47/images/simonleezftw1kvehgunsplash_1_1.png" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#07021F;background-repeat:no-repeat;width:600px;background-image:url(https://qlwwtg.stripocdn.email/content/guids/CABINET_dd9759b09de82ede623cff0b42f718ca19c0a4f85f6337f81c705fd693708d47/images/simonleezftw1kvehgunsplash_1_1.png);background-position:center bottom">
            <tbody><tr>
             <td class="es-m-p40t" align="left" style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:40px;padding-left:20px">
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tbody><tr>
                 <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                  <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tbody><tr>
                     <td align="right" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_9a73f18f5311f9c372612d7a8ed5e5cb81bfbf41c1df32746d0cba77e9055d5a/images/logo.png" alt="" width="296" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none"></td>
                    </tr>
                    <tr>
                     <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, sans-serif;line-height:27px;letter-spacing:0;color:#FFFFFF;font-size:18px"><br></p></td>
                    </tr>
                    <tr>
                     <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;font-family:Righteous, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:29px;font-style:normal;font-weight:bold;line-height:26px !important;color:#FFFFFF">ALERTA DE ${tipo_alerta}</h1></td>
                    </tr>
                    <tr>
                     <td align="center" class="es-m-p0r es-m-p0l" style="padding:0;Margin:0;padding-bottom:40px;padding-right:40px;padding-left:40px"><h3 style="Margin:0;font-family:Righteous, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#FFFFFF"><br></h3><p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, sans-serif;line-height:27px;letter-spacing:0;color:#FFFFFF;font-size:18px">Fecha Alerta: ${fecha}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, sans-serif;line-height:27px;letter-spacing:0;color:#FFFFFF;font-size:18px">${patente} / ${des}</p></td>
                    </tr>
                    <tr>
                     <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px"><!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
 <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
               style="height:46px; v-text-anchor:middle; width:273px" arcsize="50%" stroke="f"  fillcolor="#11808d">
   <w:anchorlock></w:anchorlock>
   <center style='color:#ffffff; font-family:Righteous, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px'>Ir a Plataforma</center>
 </v:roundrect></a>
<![endif]--><!--[if !mso]--><!-- --><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#11808d;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="${process.env.FRONTEND_URL}" class="es-button es-button-1675432559559" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:15px 40px;display:inline-block;background:#11808d;border-radius:30px;font-family:Righteous, sans-serif;font-weight:normal;font-style:normal;line-height:17px !important;width:auto;text-align:center;letter-spacing:5px;mso-padding-alt:0;mso-border-alt:10px solid #11808d">Ir a Plataforma</a></span><!--<![endif]--></td>
                    </tr>
                  </tbody></table></td>
                </tr>
              </tbody></table></td>
            </tr>
          </tbody></table></td>
        </tr>
      </tbody></table></td>
    </tr>
  </tbody></table>`
      })

      console.log("Mensaje Enviado: %s", info.messageId)
    
    
}



export default emailNotificaciones