import nodemailer from "nodemailer"

const emailAlerta = async (contacto, alerta, detalle) => {

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port:  process.env.EMAIL_PORT,
      auth: {
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS,
      }
    });   

    let info = ""

    if(alerta.source == "ADAM"){
      info = await transport.sendMail({
        from : "ALERTA - ADAM",
        to: contacto.mail ,
        subject : `${alerta.nom_tipo_alarma + " | " + alerta.id_ceiba }`,
        text : `${alerta.nom_tipo_alarma + " | " + alerta.id_ceiba } `,  
        
      html: 
    `  <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
     <tr style="border-collapse:collapse">
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr style="border-collapse:collapse">
          <td align="center" bgcolor="#b5b5b5" style="padding:0;Margin:0;background-color:#b5b5b5">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;border-top:10px solid transparent;border-right:10px solid transparent;border-left:10px solid transparent;width:600px;border-bottom:10px solid transparent">
             <tr style="border-collapse:collapse">
              <td align="left" bgcolor="#000000" style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:30px;padding-right:30px;background-color:#000000">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td align="left" style="padding:0;Margin:0;width:522px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_677bd423e03ffd7dc5bf05165211726b42a2738c91a309f911a08bd8f19f98a4/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="307"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse">
              <td align="left" bgcolor="#e4e0e0" style="padding:20px;Margin:0;background-color:#e4e0e0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:542px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_677bd423e03ffd7dc5bf05165211726b42a2738c91a309f911a08bd8f19f98a4/images/g6446a8ee48b75a73eb568fe4ae736e23e364055dae52f13954e8778a66f43a3ac71461100ebcf2f1f4ca7a8316e28e43_640.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="50"></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px"><h1 style="Margin:0;line-height:59px;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;font-size:49px;font-style:normal;font-weight:bold;color:#00413f">Alerta</h1></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#00413f">${alerta.nom_tipo_alarma}</h2></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><strong>Unidad</strong>: ${alerta.unidad}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><strong>Fecha</strong>:  ${alerta.inicio}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><strong>Detalle</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"> ${detalle}</p></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px"><!--[if mso]><a href="http://186.10.115.124:3113/evidence-center?eid=009901A68" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://186.10.115.124:3113/evidence-center?eid=009901A68" 
                style="height:39px; v-text-anchor:middle; width:154px" arcsize="13%" stroke="f"  fillcolor="#811301">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px'>Ver Evidencia</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border-1720808126610 es-button-border" style="border-style:solid;border-color:#00C4C6;background:#811301;border-width:0px;display:inline-block;border-radius:5px;width:auto;mso-hide:all"><a href="${alerta.url_evidencia}" class="es-button es-button-1720808126603" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:16px;display:inline-block;background:#811301;border-radius:5px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;padding:10px 20px 10px 20px;mso-padding-alt:0;mso-border-alt:10px solid #811301">Ver Evidencia</a></span><!--<![endif]--></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse">
              <td align="left" style="padding:0;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td align="center" valign="top" style="padding:0;Margin:0;width:582px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:25px;Margin:0;font-size:0px"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_677bd423e03ffd7dc5bf05165211726b42a2738c91a309f911a08bd8f19f98a4/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  
  `
      })
    }else{
      info = await transport.sendMail({
        from : "ALERTA - ADAM",
        to: contacto.mail ,
        subject : `${alerta.alarmTypeValue + " | " + alerta.deviceName + " | " + alerta.guid }`,
        text : `${alerta.alarmTypeValue + " | " + alerta.guid } `,  
        
      html: 
    `  <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
     <tr style="border-collapse:collapse">
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr style="border-collapse:collapse">
          <td align="center" bgcolor="#b5b5b5" style="padding:0;Margin:0;background-color:#b5b5b5">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;border-top:10px solid transparent;border-right:10px solid transparent;border-left:10px solid transparent;width:600px;border-bottom:10px solid transparent">
             <tr style="border-collapse:collapse">
              <td align="left" bgcolor="#000000" style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:30px;padding-right:30px;background-color:#000000">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td align="left" style="padding:0;Margin:0;width:522px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_677bd423e03ffd7dc5bf05165211726b42a2738c91a309f911a08bd8f19f98a4/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="307"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse">
              <td align="left" bgcolor="#e4e0e0" style="padding:20px;Margin:0;background-color:#e4e0e0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:542px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_677bd423e03ffd7dc5bf05165211726b42a2738c91a309f911a08bd8f19f98a4/images/g6446a8ee48b75a73eb568fe4ae736e23e364055dae52f13954e8778a66f43a3ac71461100ebcf2f1f4ca7a8316e28e43_640.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="50"></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px"><h1 style="Margin:0;line-height:59px;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;font-size:49px;font-style:normal;font-weight:bold;color:#00413f">Alerta</h1></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:Poppins, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#00413f">${alerta.alarmTypeValue}</h2></td>
                     </tr>
                     <tr style="border-collapse:collapse">
                      <td align="center" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><strong>Unidad</strong>: ${alerta.deviceName}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><strong>Fecha</strong>:  ${alerta.reportTime}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"><strong>Detalle</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:23px;color:#333333;font-size:15px"> ${detalle}</p></td>
                     </tr>
                    
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse">
              <td align="left" style="padding:0;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr style="border-collapse:collapse">
                  <td align="center" valign="top" style="padding:0;Margin:0;width:582px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr style="border-collapse:collapse">
                      <td align="center" style="padding:25px;Margin:0;font-size:0px"><img class="adapt-img" src="https://qlwwtg.stripocdn.email/content/guids/CABINET_677bd423e03ffd7dc5bf05165211726b42a2738c91a309f911a08bd8f19f98a4/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  
  `
      })


    }
    
     
      console.log("Mensaje Enviado: %s", info.messageId)
    
    
}



export default emailAlerta