import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  port: 587, // true for 465, false for other ports
  host: "smtp.dondominio.com",
  auth: {
    user: process.env.EMAILADDRESS,
    pass: process.env.PASSEMAIL,
  },
  secure: false,
});

export async function sendAuthEmail(email: string, authCode: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "CODIGO DE VALIDACION",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentsettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentsettings>
      </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="format-detection" content="address=no">
      <meta name="format-detection" content="telephone=no">
      <meta name="format-detection" content="email=no">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if mso]>
      <style type="text/css">
        .content-MS .content img { width: 560px; }
      </style>
      <![endif]-->
      <!--[if (mso)|(mso 16)]>
      <style type="text/css">
        .mlContentButton a { text-decoration: none; }
      </style>
      <![endif]-->
      <!--[if !mso]><!-- -->
      <!--<![endif]-->
      <!--[if (lt mso 16)]>
      <style type="text/css" if="variable.bodyBackgroundImage.value">
        .mlBodyBackgroundImage { background-image: none; }
      </style>
      <![endif]-->
      <style type="text/css">
        .ReadMsgBody { width: 100%; }
        .ExternalClass{ width: 100%; }
        .ExternalClass * { line-height: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
        body { margin: 0; padding: 0; }
        body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table td { border-collapse: collapse; }
        table { border-spacing: 0; border-collapse: collapse; }
        p, a, li, td, blockquote { mso-line-height-rule: exactly; }
        p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        img, a img { border: 0; outline: none; text-decoration: none; }
        img { -ms-interpolation-mode: bicubic; }
        * img[tabindex="0"] + div { display: none !important; }
        a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
        a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
        #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
        #MessageViewBody { width: 100% !important; }
        #MessageWebViewDiv { width: 100% !important; }
        @-moz-document url-prefix() {
          .bodyText p a, .bodyTitle p a {
            word-break: break-word;
          }
        }
        @media screen {
          body {
          font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 500;
          line-height: 24px;
          font-size: 18px;
        color:#fff;
        }
        * {
        direction: ltr;
        }
        }
        @media only screen and (min-width:768px){
          .mlEmailContainer{
            width: 640px!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mlTemplateContainer {
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlTemplateContainer{
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentCenter{
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentTable{
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentBlock{
            display: block !important;
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuter{
            padding-bottom: 0px!important;
            padding-left: 15px!important;
            padding-right: 15px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterSmall{
            padding-bottom: 0px!important;
            padding-left: 10px!important;
            padding-right: 10px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlMenuOuter{
            padding-bottom: 0px!important;
            padding-left: 5px!important;
            padding-right: 5px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterFullBig{
            padding: 30px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage img {
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage160 img {
            height: auto!important;
            max-width: 160px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage260 img {
            height: auto!important;
            max-width: 260px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage{
            height: 100%!important;
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlProductImage{
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentButton a{
            display: block!important;
            width: auto!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mobileHide{
            display: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mobileShow{
            display: block!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter{
            height: auto!important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter img{
            display: inline !important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginBottom{
            margin-bottom: 15px!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginTop {
            margin-top: 10px !important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentHeight{
            height: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlDisplayInline {
            display: inline-block!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlNoFloat{
            float: none!important;
            margin-left: auto!important;
            margin-right: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey{
            float: none!important;
            margin-bottom: 10px!important;
            width:100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey td a{
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .multiple-choice-item-table{
            width: 100% !important;
            margin-bottom: 20px !important;
            min-width: 10% !important;
            float: none !important;
          }
        } @media only screen and (max-width: 640px) {
          body{
            margin: 0px!important;
            padding: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          body, table, td, p, a, li, blockquote{
            -webkit-text-size-adjust: none!important;
          }
        }
        @media only screen and (max-width: 480px){
          .social-LinksTable{
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:first-child{
            padding-left: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:last-child{
            padding-right: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td{
            padding: 0 10px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td img{
            height: auto!important;
            max-width: 48px;
            width: 100%!important;
          }
        }
        /* Carousel style */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .webkit {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .non-webkit {
            display: none !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          /* TARGET OUTLOOK.COM */
          [class="x_non-webkit"] {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          [class="x_webkit"] {
            display: none !important;
          }
        }
      /* estilos custom **/
      .mlbodybackground{
          background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
      }
      h1 {
        font-size: 35px;
        font-style: italic;
        font-weight: 800;
        line-height: 44px;
      }
      h1>span.colores {
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
        -webkit-background-clip: text;
        background-clip: text;
        padding: 0 8px;
      }
      a.boton{
          background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
        border-radius: 8px;
        padding: 8px 16px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        gap: 10px;
        height: 48px;
        line-height: 16px;
        text-decoration:none;
      }
      </style>
      <!--[if mso]>
      <style type="text/css">
        .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
        .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
      </style>
      <![endif]-->
    <style type="text/css">
      @media only screen and (max-width: 640px){
        #logoBlock-4 {
          max-width: 560px!important;
          width: 100%!important;
        }
      }
    </style>
    </head>
    <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
    <div role="article" aria-roledescription="email" aria-label="">
    <!--[if !mso]><!-- -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
      <tr>
        <td class="mlTemplateContainer" align="center">
        <!--<![endif]-->
        <!--[if mso 16]>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
          <td bgcolor="#f6f8f9" align="center">
          <!--<![endif]-->
        <!-- Contenido -->
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
          <tr>
            <td align="center">
            </td>
          </tr>
        </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
          <tr>
            <td>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td align="center">
                                    <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="left" class="bodyTitle">
                                    <h1>¡Aquí tienes tu <span class="colores">código de verificación!</span></h1>
                                  </td>
                                </tr>
                              </table>
    
                              </td>
                            </tr>
                          </table>					   
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                      <p>¡Hola ${username}!</p>
                                      <p><br>Aquí te dejamos tu código de acceso a nuestra APP:</p>
                                      <p><br>${authCode}</p>
                                      <p><br>Fácil. Sencillo. Y además, ÚNICOS.</p>
                                      <p><br>Si tienes problemas para acceder, escríbenos a info@xperiend.com</p>

                                      <p>Equipo XPERIEND</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                            </tr>
                          </table>              
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" class="">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                  <tr>
                                    <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td class="bodyTitle" id="bodyText-12">
                                      <p>XPERIEND.COM<br><br><br></p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          </table>
          <!--[if mso 16]>
          </td>
          </tr>
          </table>
          <!--<![endif]-->
          <!--[if !mso]><!-- -->
        </td>
      </tr>
    </table>
    <!--<![endif]-->
    </div>
    </body>`,
  };
  return transporter.sendMail(mailData);
}
export async function sendWelcomeEmailSinSubs(email: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Bienvenido a XPERIEND",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentsettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentsettings>
      </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="format-detection" content="address=no">
      <meta name="format-detection" content="telephone=no">
      <meta name="format-detection" content="email=no">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if mso]>
      <style type="text/css">
        .content-MS .content img { width: 560px; }
      </style>
      <![endif]-->
      <!--[if (mso)|(mso 16)]>
      <style type="text/css">
        .mlContentButton a { text-decoration: none; }
      </style>
      <![endif]-->
      <!--[if !mso]><!-- -->
      <!--<![endif]-->
      <!--[if (lt mso 16)]>
      <style type="text/css" if="variable.bodyBackgroundImage.value">
        .mlBodyBackgroundImage { background-image: none; }
      </style>
      <![endif]-->
      <style type="text/css">
        .ReadMsgBody { width: 100%; }
        .ExternalClass{ width: 100%; }
        .ExternalClass * { line-height: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
        body { margin: 0; padding: 0; }
        body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table td { border-collapse: collapse; }
        table { border-spacing: 0; border-collapse: collapse; }
        p, a, li, td, blockquote { mso-line-height-rule: exactly; }
        p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        img, a img { border: 0; outline: none; text-decoration: none; }
        img { -ms-interpolation-mode: bicubic; }
        * img[tabindex="0"] + div { display: none !important; }
        a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
        a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
        #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
        #MessageViewBody { width: 100% !important; }
        #MessageWebViewDiv { width: 100% !important; }
        @-moz-document url-prefix() {
          .bodyText p a, .bodyTitle p a {
            word-break: break-word;
          }
        }
        @media screen {
          body {
          font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 500;
          line-height: 24px;
          font-size: 18px;
        color:#fff;
        }
        * {
        direction: ltr;
        }
        }
        @media only screen and (min-width:768px){
          .mlEmailContainer{
            width: 640px!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mlTemplateContainer {
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlTemplateContainer{
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentCenter{
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentTable{
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentBlock{
            display: block !important;
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuter{
            padding-bottom: 0px!important;
            padding-left: 15px!important;
            padding-right: 15px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterSmall{
            padding-bottom: 0px!important;
            padding-left: 10px!important;
            padding-right: 10px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlMenuOuter{
            padding-bottom: 0px!important;
            padding-left: 5px!important;
            padding-right: 5px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterFullBig{
            padding: 30px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage img {
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage160 img {
            height: auto!important;
            max-width: 160px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage260 img {
            height: auto!important;
            max-width: 260px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage{
            height: 100%!important;
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlProductImage{
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentButton a{
            display: block!important;
            width: auto!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mobileHide{
            display: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mobileShow{
            display: block!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter{
            height: auto!important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter img{
            display: inline !important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginBottom{
            margin-bottom: 15px!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginTop {
            margin-top: 10px !important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentHeight{
            height: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlDisplayInline {
            display: inline-block!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlNoFloat{
            float: none!important;
            margin-left: auto!important;
            margin-right: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey{
            float: none!important;
            margin-bottom: 10px!important;
            width:100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey td a{
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .multiple-choice-item-table{
            width: 100% !important;
            margin-bottom: 20px !important;
            min-width: 10% !important;
            float: none !important;
          }
        } @media only screen and (max-width: 640px) {
          body{
            margin: 0px!important;
            padding: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          body, table, td, p, a, li, blockquote{
            -webkit-text-size-adjust: none!important;
          }
        }
        @media only screen and (max-width: 480px){
          .social-LinksTable{
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:first-child{
            padding-left: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:last-child{
            padding-right: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td{
            padding: 0 10px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td img{
            height: auto!important;
            max-width: 48px;
            width: 100%!important;
          }
        }
        /* Carousel style */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .webkit {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .non-webkit {
            display: none !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          /* TARGET OUTLOOK.COM */
          [class="x_non-webkit"] {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          [class="x_webkit"] {
            display: none !important;
          }
        }
      /* estilos custom **/
      .mlbodybackground{
          background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
      }
      h1 {
        font-size: 35px;
        font-style: italic;
        font-weight: 800;
        line-height: 44px;
      }
      h1>span.colores {
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
        -webkit-background-clip: text;
        background-clip: text;
        padding: 0 8px;
      }
      a.boton{
          background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
        border-radius: 8px;
        padding: 8px 16px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        gap: 10px;
        height: 48px;
        line-height: 16px;
        text-decoration:none;
      }
      </style>
      <!--[if mso]>
      <style type="text/css">
        .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
        .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
      </style>
      <![endif]-->
    <style type="text/css">
      @media only screen and (max-width: 640px){
        #logoBlock-4 {
          max-width: 560px!important;
          width: 100%!important;
        }
      }
    </style>
    </head>
    <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
    <div role="article" aria-roledescription="email" aria-label="">
    <!--[if !mso]><!-- -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
      <tr>
        <td class="mlTemplateContainer" align="center">
        <!--<![endif]-->
        <!--[if mso 16]>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
          <td bgcolor="#f6f8f9" align="center">
          <!--<![endif]-->
        <!-- Contenido -->
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
          <tr>
            <td align="center">
            </td>
          </tr>
        </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
          <tr>
            <td>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td align="center">
                                    <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="left" class="bodyTitle">
                                    <h1>¡Bienvenido al <span class="colores">Club Xperiend!</span></h1>
                                  </td>
                                </tr>
                              </table>
    
                              </td>
                            </tr>
                          </table>					   
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                      <p>¡Hola, ${username}!</p>
                                      <p><br>Si estás aquí es porque has dado el primer paso en apostar por el caballo ganador. Como te imaginarás, este Club no es para todos. Solo para los que realmente quieren arriesgar y ganar.</p>
                                      <p><br>Al acceder a nuestra APP has dado el primer paso. Estamos seguros de que ya nos has stalkeado un buen rato, y podrás decir que sí, que muy fácil y sencillo... Pues así son todos nuestros proyectos.</p>
                                      <p>Fácil. Sencillo. Y además, ÚNICOS.</p>
                                      <p><br>¿Qué pasaría si fueras miembro del Club?</p>
                                      <p>- <u>Inversiones premium</u>: Accede a inversiones inmobiliarias únicas y altamente rentables. Te brindamos oportunidades cuidadosamente seleccionadas para maximizar tu potencial de crecimiento patrimonial.</p>
                                      <p>- <u>Experiencias vacacionales extraordinarias</u>: Descubre una amplia gama de viviendas exclusivas en destinos de ensueño. Disfruta de experiencias vacacionales inigualables, sin sorpresas. </p>
                                      <p>- <u>Beneficios exclusivos</u>: Obtén acceso a beneficios especiales, como descuentos en servicios premium, eventos exclusivos y promociones limitadas. Como miembro del Club, recibirás trato preferencial y oportunidades exclusivas.</p>
                                      <p>- <u>Apoyo y asesoramiento</u>: Nuestro equipo de expertos está aquí para brindarte asesoramiento personalizado en tus inversiones y ayudarte en todo lo que necesites. Estamos comprometidos en brindarte un servicio excepcional y apoyarte en tus metas financieras.</p>
                                      <p><br>Por cierto, quizás se te ha olvidado darte de alta en nuestra newsletter. Si es así, puedes darte de alta aquí (LINK).</p>
                                      <p><br>¡Un abrazo y nos vemos dentro del Club XPERIEND!</p>
                                    
                                      <p>Equipo XPERIEND</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                            </tr>
                          </table>              
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" class="">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                  <tr>
                                    <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td class="bodyTitle" id="bodyText-12">
                                      <p>XPERIEND.COM<br><br><br></p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          </table>
          <!--[if mso 16]>
          </td>
          </tr>
          </table>
          <!--<![endif]-->
          <!--[if !mso]><!-- -->
        </td>
      </tr>
    </table>
    <!--<![endif]-->
    </div>
    </body>`,
  };
  return transporter.sendMail(mailData);
}
export async function sendWelcomeEmailConSubs(email: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Bienvenido a XPERIEND",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentsettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentsettings>
      </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="format-detection" content="address=no">
      <meta name="format-detection" content="telephone=no">
      <meta name="format-detection" content="email=no">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if mso]>
      <style type="text/css">
        .content-MS .content img { width: 560px; }
      </style>
      <![endif]-->
      <!--[if (mso)|(mso 16)]>
      <style type="text/css">
        .mlContentButton a { text-decoration: none; }
      </style>
      <![endif]-->
      <!--[if !mso]><!-- -->
      <!--<![endif]-->
      <!--[if (lt mso 16)]>
      <style type="text/css" if="variable.bodyBackgroundImage.value">
        .mlBodyBackgroundImage { background-image: none; }
      </style>
      <![endif]-->
      <style type="text/css">
        .ReadMsgBody { width: 100%; }
        .ExternalClass{ width: 100%; }
        .ExternalClass * { line-height: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
        body { margin: 0; padding: 0; }
        body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table td { border-collapse: collapse; }
        table { border-spacing: 0; border-collapse: collapse; }
        p, a, li, td, blockquote { mso-line-height-rule: exactly; }
        p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        img, a img { border: 0; outline: none; text-decoration: none; }
        img { -ms-interpolation-mode: bicubic; }
        * img[tabindex="0"] + div { display: none !important; }
        a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
        a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
        #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
        #MessageViewBody { width: 100% !important; }
        #MessageWebViewDiv { width: 100% !important; }
        @-moz-document url-prefix() {
          .bodyText p a, .bodyTitle p a {
            word-break: break-word;
          }
        }
        @media screen {
          body {
          font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 500;
          line-height: 24px;
          font-size: 18px;
        color:#fff;
        }
        * {
        direction: ltr;
        }
        }
        @media only screen and (min-width:768px){
          .mlEmailContainer{
            width: 640px!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mlTemplateContainer {
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlTemplateContainer{
            padding: 10px 10px 0 10px;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentCenter{
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentTable{
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentBlock{
            display: block !important;
            width: 100%!important;
            min-width: 10%!important;
            margin: 0!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuter{
            padding-bottom: 0px!important;
            padding-left: 15px!important;
            padding-right: 15px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterSmall{
            padding-bottom: 0px!important;
            padding-left: 10px!important;
            padding-right: 10px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlMenuOuter{
            padding-bottom: 0px!important;
            padding-left: 5px!important;
            padding-right: 5px!important;
            padding-top: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentOuterFullBig{
            padding: 30px!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage img {
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage160 img {
            height: auto!important;
            max-width: 160px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage260 img {
            height: auto!important;
            max-width: 260px;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentImage{
            height: 100%!important;
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlProductImage{
            height: auto!important;
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentButton a{
            display: block!important;
            width: auto!important;
          }
        }
        @media only screen and (max-width: 640px) {
          .mobileHide{
            display: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mobileShow{
            display: block!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter{
            height: auto!important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .alignCenter img{
            display: inline !important;
            text-align: center!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginBottom{
            margin-bottom: 15px!important;
          }
        } @media only screen and (max-width: 640px) {
          .marginTop {
            margin-top: 10px !important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentHeight{
            height: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlDisplayInline {
            display: inline-block!important;
            float: none!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlNoFloat{
            float: none!important;
            margin-left: auto!important;
            margin-right: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey{
            float: none!important;
            margin-bottom: 10px!important;
            width:100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .mlContentSurvey td a{
            width: auto!important;
          }
        } @media only screen and (max-width: 640px) {
          .multiple-choice-item-table{
            width: 100% !important;
            margin-bottom: 20px !important;
            min-width: 10% !important;
            float: none !important;
          }
        } @media only screen and (max-width: 640px) {
          body{
            margin: 0px!important;
            padding: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          body, table, td, p, a, li, blockquote{
            -webkit-text-size-adjust: none!important;
          }
        }
        @media only screen and (max-width: 480px){
          .social-LinksTable{
            width: 100%!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:first-child{
            padding-left: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td:last-child{
            padding-right: 0px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td{
            padding: 0 10px!important;
          }
        } @media only screen and (max-width: 640px) {
          .social-LinksTable td img{
            height: auto!important;
            max-width: 48px;
            width: 100%!important;
          }
        }
        /* Carousel style */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .webkit {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .non-webkit {
            display: none !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          /* TARGET OUTLOOK.COM */
          [class="x_non-webkit"] {
            display: block !important;
          }
        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
          [class="x_webkit"] {
            display: none !important;
          }
        }
      /* estilos custom **/
      .mlbodybackground{
          background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
      }
      h1 {
        font-size: 35px;
        font-style: italic;
        font-weight: 800;
        line-height: 44px;
      }
      h1>span.colores {
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
        -webkit-background-clip: text;
        background-clip: text;
        padding: 0 8px;
      }
      a.boton{
          background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
        border-radius: 8px;
        padding: 8px 16px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        gap: 10px;
        height: 48px;
        line-height: 16px;
        text-decoration:none;
      }
      </style>
      <!--[if mso]>
      <style type="text/css">
        .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
        .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
        .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
        .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
      </style>
      <![endif]-->
    <style type="text/css">
      @media only screen and (max-width: 640px){
        #logoBlock-4 {
          max-width: 560px!important;
          width: 100%!important;
        }
      }
    </style>
    </head>
    <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
    <div role="article" aria-roledescription="email" aria-label="">
    <!--[if !mso]><!-- -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
      <tr>
        <td class="mlTemplateContainer" align="center">
        <!--<![endif]-->
        <!--[if mso 16]>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
          <td bgcolor="#f6f8f9" align="center">
          <!--<![endif]-->
        <!-- Contenido -->
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
          <tr>
            <td align="center">
            </td>
          </tr>
        </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
          <tr>
            <td>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td align="center">
                                    <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
    
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="left" class="bodyTitle">
                                    <h1>¡Bienvenido al <span class="colores">Club Xperiend!</span></h1>
                                  </td>
                                </tr>
                              </table>
    
                              </td>
                            </tr>
                          </table>					   
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                      <p>¡Hola, ${username}!</p>
                                      <p><br>¡Bienvenido a la APP de XPERIEND! Esto significa que estás solo a unos clics de ser miembro del Club XPERIEND. Sí, así de fácil y sencillo.</p>
                                      <p><br>Estamos seguros de que ya has stalkeado toda la APP y te has percatado de que ha sido desarrollada específicamente para ti. Todo bien mascado para que entiendas todos los detalles sin importar tu nivel de conocimientos sobre inversión.</p>
                                      <p>¿Qué te vas a encontrar en nuestra newsletter?</p>
                                      <p><br>Actualizaciones de inversión: Te mantendremos al día sobre las oportunidades de inversión que presentamos en nuestro Club. Sí, esos, los que hemos estudiado meticulosamente para que puedas aumentar tus ingresos.</p>
                                      <p><br>Eventos y promociones especiales: Serás el primero en enterarte de nuestros eventos exclusivos y promociones especiales. </p>
                                      <p><br>Actualizaciones de nuestro sector: Recibirás información muy valiosa sobre inversión inmobiliaria, gestión patrimonial y optimización fiscal. Queremos que te conviertas en un experto en el mundo de las inversiones. </p>
                                      <p>Una vez más, bienvenido a XPERIEND. Fácil, sencillo y, por supuesto, único.</p>
                                      <p><br>Escríbenos si necesitas más info o más información sobre nuestros proyectos.</p>
                                      <p><br/>Un fuerte abrazo y nos vemos en la siguiente newsletter, o dentro del Club ;)</p>
                                     
                                      <p>Equipo XPERIEND</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                            </tr>
                          </table>              
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" class="">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                  <tr>
                                    <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
                <tr>
                  <td class="mlContentTableCardTd">
                    <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                            </tr>
                          </table>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                            <tr>
                              <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tr>
                                    <td class="bodyTitle" id="bodyText-12">
                                      <p>XPERIEND.COM<br><br><br></p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          </table>
          <!--[if mso 16]>
          </td>
          </tr>
          </table>
          <!--<![endif]-->
          <!--[if !mso]><!-- -->
        </td>
      </tr>
    </table>
    <!--<![endif]-->
    </div>
    </body>`,
  };
  return transporter.sendMail(mailData);
}
export async function sendThanksBuyEmail(email: string,xrenAmount:number, metodoDePago:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Gracias por su compra",
    html: `<h2 style="color:#23262F;">Xperiend te da las gracias.</h2><h3 style="color:#6E7786;">Por la compra de ${xrenAmount} a traves del siguiente metodo de pago ${metodoDePago} </h3>`,
  };
  return transporter.sendMail(mailData);
}
export async function sendCompraTransferenciaEmail(email: string,username:string,numeroDecuenta:string,banco:string,monto:number,name:string,concepto:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Compra de participacion, pago pendiente",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentsettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentsettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if mso]>
    <style type="text/css">
      .content-MS .content img { width: 560px; }
    </style>
    <![endif]-->
    <!--[if (mso)|(mso 16)]>
    <style type="text/css">
      .mlContentButton a { text-decoration: none; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <!--<![endif]-->
    <!--[if (lt mso 16)]>
    <style type="text/css" if="variable.bodyBackgroundImage.value">
      .mlBodyBackgroundImage { background-image: none; }
    </style>
    <![endif]-->
    <style type="text/css">
      .ReadMsgBody { width: 100%; }
      .ExternalClass{ width: 100%; }
      .ExternalClass * { line-height: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
      body { margin: 0; padding: 0; }
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table td { border-collapse: collapse; }
      table { border-spacing: 0; border-collapse: collapse; }
      p, a, li, td, blockquote { mso-line-height-rule: exactly; }
      p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      img, a img { border: 0; outline: none; text-decoration: none; }
      img { -ms-interpolation-mode: bicubic; }
      * img[tabindex="0"] + div { display: none !important; }
      a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
      a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
      #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
      #MessageViewBody { width: 100% !important; }
      #MessageWebViewDiv { width: 100% !important; }
      @-moz-document url-prefix() {
        .bodyText p a, .bodyTitle p a {
          word-break: break-word;
        }
      }
      @media screen {
        body {
        font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 500;
        line-height: 24px;
        font-size: 18px;
      color:#fff;
      }
      * {
      direction: ltr;
      }
      }
      @media only screen and (min-width:768px){
        .mlEmailContainer{
          width: 640px!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mlTemplateContainer {
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlTemplateContainer{
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentCenter{
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentTable{
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentBlock{
          display: block !important;
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuter{
          padding-bottom: 0px!important;
          padding-left: 15px!important;
          padding-right: 15px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterSmall{
          padding-bottom: 0px!important;
          padding-left: 10px!important;
          padding-right: 10px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlMenuOuter{
          padding-bottom: 0px!important;
          padding-left: 5px!important;
          padding-right: 5px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterFullBig{
          padding: 30px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage img {
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage160 img {
          height: auto!important;
          max-width: 160px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage260 img {
          height: auto!important;
          max-width: 260px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage{
          height: 100%!important;
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlProductImage{
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentButton a{
          display: block!important;
          width: auto!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mobileHide{
          display: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mobileShow{
          display: block!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter{
          height: auto!important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter img{
          display: inline !important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginBottom{
          margin-bottom: 15px!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginTop {
          margin-top: 10px !important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentHeight{
          height: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlDisplayInline {
          display: inline-block!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlNoFloat{
          float: none!important;
          margin-left: auto!important;
          margin-right: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey{
          float: none!important;
          margin-bottom: 10px!important;
          width:100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey td a{
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .multiple-choice-item-table{
          width: 100% !important;
          margin-bottom: 20px !important;
          min-width: 10% !important;
          float: none !important;
        }
      } @media only screen and (max-width: 640px) {
        body{
          margin: 0px!important;
          padding: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        body, table, td, p, a, li, blockquote{
          -webkit-text-size-adjust: none!important;
        }
      }
      @media only screen and (max-width: 480px){
        .social-LinksTable{
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:first-child{
          padding-left: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:last-child{
          padding-right: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td{
          padding: 0 10px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td img{
          height: auto!important;
          max-width: 48px;
          width: 100%!important;
        }
      }
      .fa {
        padding: 18px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      /* Carousel style */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .webkit {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .non-webkit {
          display: none !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        /* TARGET OUTLOOK.COM */
        [class="x_non-webkit"] {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        [class="x_webkit"] {
          display: none !important;
        }
      }
    /* estilos custom **/
    .mlbodybackground{
        background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
    }
    h1 {
      font-size: 35px;
      font-style: italic;
      font-weight: 800;
      line-height: 44px;
    }
    h1>span.colores {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      -webkit-background-clip: text;
      background-clip: text;
      padding: 0 8px;
    }
    a.boton{
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      border-radius: 8px;
      padding: 8px 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      gap: 10px;
      height: 48px;
      line-height: 16px;
      text-decoration:none;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
      .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 640px){
      #logoBlock-4 {
        max-width: 560px!important;
        width: 100%!important;
      }
    }
  </style>
  </head>
  <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
  <div role="article" aria-roledescription="email" aria-label="">
  <!--[if !mso]><!-- -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
    <tr>
      <td class="mlTemplateContainer" align="center">
      <!--<![endif]-->
      <!--[if mso 16]>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td bgcolor="#f6f8f9" align="center">
        <!--<![endif]-->
      <!-- Contenido -->
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
        <tr>
          <td>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="center">
                                  <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                              <tr>
                                <td align="left" class="bodyTitle">
                                  <h1>¡Pendiente de Tu Transferencia para  <span class="colores">completar su compra de XREN!</span></h1>
                                </td>
                              </tr>
                            </table>
  
                            </td>
                          </tr>
                        </table>					   
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                    <p>¡Hola ${username}!</p>
                                    <p><br>Espero que estés bien. Quería recordarte que estamos a la espera de recibir tu transferencia para completar el proceso de compra. La cantidad pendiente es [monto] y agradeceríamos mucho tu pronta atención a este asunto.
                                    <p><br>Aquí están los detalles de la cuenta a la que puedes realizar la transferencia:</p>
                                    <p><br>Nombre del Banco:${banco}
                                    <br>Número de Cuenta: ${numeroDecuenta}
                                    <br>Titular de la Cuenta: [Tu Nombre]
                                    <br>Referencia: ${concepto}</p>
                                    <p><br>Por favor, asegúrate de incluir la referencia proporcionada para que podamos identificar y procesar tu pago de manera rápida y precisa.</p>
                                    <p><br>Si ya has realizado la transferencia, te agradecemos y te pedimos disculpas por cualquier inconveniente. Si aún no has tenido la oportunidad, te instamos a completar la transacción lo antes posible para que puedas disfrutar de tu compra sin demoras.</p>
                                    <p><br>Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte en soporte@xperiend.com.</p>
                                    <p><br>Gracias por tu cooperación y comprensión. Estamos aquí para ayudarte en todo lo que necesites.</p>
                                    <p><br>Saludos cordiales,</p>
                                    <p>Equipo XPERIEND</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                          </tr>
                        </table>              
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" class="">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                <tr>
                                  <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-12">
                                    <p> 
                                      <a class="boton" href="https://www.xperiend.com" target="_blank">XPERIEND.COM</a>
                                      <a class="boton" href="https://xperiend.io" target="_blank">XPERIEND APP</a>
                                    </p>
                                    <p> 
                                      <a href="https://t.me/+efmSPhwyQWk1MmQ0" class="fa fa-telegram" target="_blank"/>
                                      <a href="https://www.instagram.com/xperiend/" class="fa fa-instagram" target="_blank"/>
                                      <a href="https://twitter.com/Xperiendtoken" class="fa fa-twitter" target="_blank"/>
                                      <a href="https://www.linkedin.com/company/xperiend/" class="fa fa-linkedin" target="_blank"/>
                                      <a href="https://www.youtube.com/@xperiend1575" class="fa fa-youtube" target="_blank"/>
                                      <a href="https://m.facebook.com/xperiend/" class="fa fa-facebook" target="_blank"/>
                                      <a href=""></a>
                                      <br><br><br><br><br><br>
                                    </p> 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        <!--[if mso 16]>
        </td>
        </tr>
        </table>
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
      </td>
    </tr>
  </table>
  <!--<![endif]-->
  </div>
  </body>`,
  };
  return transporter.sendMail(mailData);
}

export async function sendPagoCancelado(email: string,order_id:number,concepto:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: `Su pago ha sido cancelado`,
    html: `<h2 style="color:#23262F;">${concepto}</h2><h3 style="color:#6E7786;">Su pago ha sido cancelado, le recordamos que ya no debe hacer la transferencia bancaria por la orden ${order_id}, de hacer la transferencia la misma sera devuelta</h3>`,
  };
  return transporter.sendMail(mailData);
}

export async function sendPagoDevuelto(email: string,order_id:number,concepto:string,cantidad:number,fecha:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: `Su pago ha sido devuelto`,
    html: `<h2 style="color:#23262F;">${concepto}</h2><h3 style="color:#6E7786;">Su pago ha sido devuelto, la orden ${order_id} con el monto pagado ${cantidad} ha sido devuelto el ${fecha}</h3>`,
  };
  return transporter.sendMail(mailData);
}
export async function sendRecoverCode(email: string, authCode: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "CODIGO DE RECUPERACION DE CONTRASENA",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentsettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentsettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if mso]>
    <style type="text/css">
      .content-MS .content img { width: 560px; }
    </style>
    <![endif]-->
    <!--[if (mso)|(mso 16)]>
    <style type="text/css">
      .mlContentButton a { text-decoration: none; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <!--<![endif]-->
    <!--[if (lt mso 16)]>
    <style type="text/css" if="variable.bodyBackgroundImage.value">
      .mlBodyBackgroundImage { background-image: none; }
    </style>
    <![endif]-->
    <style type="text/css">
      .ReadMsgBody { width: 100%; }
      .ExternalClass{ width: 100%; }
      .ExternalClass * { line-height: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
      body { margin: 0; padding: 0; }
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table td { border-collapse: collapse; }
      table { border-spacing: 0; border-collapse: collapse; }
      p, a, li, td, blockquote { mso-line-height-rule: exactly; }
      p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      img, a img { border: 0; outline: none; text-decoration: none; }
      img { -ms-interpolation-mode: bicubic; }
      * img[tabindex="0"] + div { display: none !important; }
      a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
      a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
      #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
      #MessageViewBody { width: 100% !important; }
      #MessageWebViewDiv { width: 100% !important; }
      @-moz-document url-prefix() {
        .bodyText p a, .bodyTitle p a {
          word-break: break-word;
        }
      }
      @media screen {
        body {
        font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 500;
        line-height: 24px;
        font-size: 18px;
      color:#fff;
      }
      * {
      direction: ltr;
      }
      }
      @media only screen and (min-width:768px){
        .mlEmailContainer{
          width: 640px!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mlTemplateContainer {
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlTemplateContainer{
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentCenter{
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentTable{
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentBlock{
          display: block !important;
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuter{
          padding-bottom: 0px!important;
          padding-left: 15px!important;
          padding-right: 15px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterSmall{
          padding-bottom: 0px!important;
          padding-left: 10px!important;
          padding-right: 10px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlMenuOuter{
          padding-bottom: 0px!important;
          padding-left: 5px!important;
          padding-right: 5px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterFullBig{
          padding: 30px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage img {
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage160 img {
          height: auto!important;
          max-width: 160px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage260 img {
          height: auto!important;
          max-width: 260px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage{
          height: 100%!important;
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlProductImage{
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentButton a{
          display: block!important;
          width: auto!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mobileHide{
          display: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mobileShow{
          display: block!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter{
          height: auto!important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter img{
          display: inline !important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginBottom{
          margin-bottom: 15px!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginTop {
          margin-top: 10px !important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentHeight{
          height: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlDisplayInline {
          display: inline-block!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlNoFloat{
          float: none!important;
          margin-left: auto!important;
          margin-right: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey{
          float: none!important;
          margin-bottom: 10px!important;
          width:100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey td a{
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .multiple-choice-item-table{
          width: 100% !important;
          margin-bottom: 20px !important;
          min-width: 10% !important;
          float: none !important;
        }
      } @media only screen and (max-width: 640px) {
        body{
          margin: 0px!important;
          padding: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        body, table, td, p, a, li, blockquote{
          -webkit-text-size-adjust: none!important;
        }
      }
      @media only screen and (max-width: 480px){
        .social-LinksTable{
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:first-child{
          padding-left: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:last-child{
          padding-right: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td{
          padding: 0 10px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td img{
          height: auto!important;
          max-width: 48px;
          width: 100%!important;
        }
      }
      .fa {
        padding: 18px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      /* Carousel style */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .webkit {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .non-webkit {
          display: none !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        /* TARGET OUTLOOK.COM */
        [class="x_non-webkit"] {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        [class="x_webkit"] {
          display: none !important;
        }
      }
    /* estilos custom **/
    .mlbodybackground{
        background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
    }
    h1 {
      font-size: 35px;
      font-style: italic;
      font-weight: 800;
      line-height: 44px;
    }
    h1>span.colores {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      -webkit-background-clip: text;
      background-clip: text;
      padding: 0 8px;
    }
    a.boton{
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      border-radius: 8px;
      padding: 8px 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      gap: 10px;
      height: 48px;
      line-height: 16px;
      text-decoration:none;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
      .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 640px){
      #logoBlock-4 {
        max-width: 560px!important;
        width: 100%!important;
      }
    }
  </style>
  </head>
  <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
  <div role="article" aria-roledescription="email" aria-label="">
  <!--[if !mso]><!-- -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
    <tr>
      <td class="mlTemplateContainer" align="center">
      <!--<![endif]-->
      <!--[if mso 16]>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td bgcolor="#f6f8f9" align="center">
        <!--<![endif]-->
      <!-- Contenido -->
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
        <tr>
          <td>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="center">
                                  <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                              <tr>
                                <td align="left" class="bodyTitle">
                                  <h1>¡Aquí tienes tu <span class="colores">cambio de contraseña!</span></h1>
                                </td>
                              </tr>
                            </table>
  
                            </td>
                          </tr>
                        </table>					   
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                    <p>¡Hola ${username}!</p>
                                    <p><br>Recientemente solicitaste un restablecimiento de contraseña.</p>
                                    <p><br>Si desea restablecer su contraseña, utilice el código para continuar:</p>
                                    <p><br>${authCode}</p>
                                    <p><br>Si no solicitó este cambio, comuníquese con nosotros de inmediato en soporte@xperiend.com. Tenga en cuenta que nunca le pediremos su contraseña por correo electrónico o por teléfono.</p>
                                    <p><br>Fácil. Sencillo. Y además, ÚNICOS.</p>
                                    <p>Equipo XPERIEND</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                          </tr>
                        </table>              
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" class="">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                <tr>
                                  <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-12">
                                    <p> 
                                      <a class="boton" href="https://www.xperiend.com" target="_blank">XPERIEND.COM</a>
                                      <a class="boton" href="https://xperiend.io" target="_blank">XPERIEND APP</a>
                                    </p>
                                    <p> 
                                      <a href="https://t.me/+efmSPhwyQWk1MmQ0" class="fa fa-telegram" target="_blank"/>
                                      <a href="https://www.instagram.com/xperiend/" class="fa fa-instagram" target="_blank"/>
                                      <a href="https://twitter.com/Xperiendtoken" class="fa fa-twitter" target="_blank"/>
                                      <a href="https://www.linkedin.com/company/xperiend/" class="fa fa-linkedin" target="_blank"/>
                                      <a href="https://www.youtube.com/@xperiend1575" class="fa fa-youtube" target="_blank"/>
                                      <a href="https://m.facebook.com/xperiend/" class="fa fa-facebook" target="_blank"/>
                                      <a href=""></a>
                                      <br><br><br><br><br><br>
                                    </p> 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        <!--[if mso 16]>
        </td>
        </tr>
        </table>
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
      </td>
    </tr>
  </table>
  <!--<![endif]-->
  </div>
  </body>`}
  return transporter.sendMail(mailData);
}

export async function sendKycAprobado(email: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Su KYC ha sido aprobado",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentsettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentsettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if mso]>
    <style type="text/css">
      .content-MS .content img { width: 560px; }
    </style>
    <![endif]-->
    <!--[if (mso)|(mso 16)]>
    <style type="text/css">
      .mlContentButton a { text-decoration: none; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <!--<![endif]-->
    <!--[if (lt mso 16)]>
    <style type="text/css" if="variable.bodyBackgroundImage.value">
      .mlBodyBackgroundImage { background-image: none; }
    </style>
    <![endif]-->
    <style type="text/css">
      .ReadMsgBody { width: 100%; }
      .ExternalClass{ width: 100%; }
      .ExternalClass * { line-height: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
      body { margin: 0; padding: 0; }
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table td { border-collapse: collapse; }
      table { border-spacing: 0; border-collapse: collapse; }
      p, a, li, td, blockquote { mso-line-height-rule: exactly; }
      p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      img, a img { border: 0; outline: none; text-decoration: none; }
      img { -ms-interpolation-mode: bicubic; }
      * img[tabindex="0"] + div { display: none !important; }
      a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
      a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
      #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
      #MessageViewBody { width: 100% !important; }
      #MessageWebViewDiv { width: 100% !important; }
      @-moz-document url-prefix() {
        .bodyText p a, .bodyTitle p a {
          word-break: break-word;
        }
      }
      @media screen {
        body {
        font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 500;
        line-height: 24px;
        font-size: 18px;
      color:#fff;
      }
      * {
      direction: ltr;
      }
      }
      @media only screen and (min-width:768px){
        .mlEmailContainer{
          width: 640px!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mlTemplateContainer {
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlTemplateContainer{
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentCenter{
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentTable{
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentBlock{
          display: block !important;
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuter{
          padding-bottom: 0px!important;
          padding-left: 15px!important;
          padding-right: 15px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterSmall{
          padding-bottom: 0px!important;
          padding-left: 10px!important;
          padding-right: 10px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlMenuOuter{
          padding-bottom: 0px!important;
          padding-left: 5px!important;
          padding-right: 5px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterFullBig{
          padding: 30px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage img {
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage160 img {
          height: auto!important;
          max-width: 160px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage260 img {
          height: auto!important;
          max-width: 260px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage{
          height: 100%!important;
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlProductImage{
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentButton a{
          display: block!important;
          width: auto!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mobileHide{
          display: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mobileShow{
          display: block!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter{
          height: auto!important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter img{
          display: inline !important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginBottom{
          margin-bottom: 15px!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginTop {
          margin-top: 10px !important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentHeight{
          height: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlDisplayInline {
          display: inline-block!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlNoFloat{
          float: none!important;
          margin-left: auto!important;
          margin-right: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey{
          float: none!important;
          margin-bottom: 10px!important;
          width:100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey td a{
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .multiple-choice-item-table{
          width: 100% !important;
          margin-bottom: 20px !important;
          min-width: 10% !important;
          float: none !important;
        }
      } @media only screen and (max-width: 640px) {
        body{
          margin: 0px!important;
          padding: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        body, table, td, p, a, li, blockquote{
          -webkit-text-size-adjust: none!important;
        }
      }
      @media only screen and (max-width: 480px){
        .social-LinksTable{
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:first-child{
          padding-left: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:last-child{
          padding-right: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td{
          padding: 0 10px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td img{
          height: auto!important;
          max-width: 48px;
          width: 100%!important;
        }
      }
      .fa {
        padding: 18px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      /* Carousel style */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .webkit {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .non-webkit {
          display: none !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        /* TARGET OUTLOOK.COM */
        [class="x_non-webkit"] {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        [class="x_webkit"] {
          display: none !important;
        }
      }
    /* estilos custom **/
    .mlbodybackground{
        background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
    }
    h1 {
      font-size: 35px;
      font-style: italic;
      font-weight: 800;
      line-height: 44px;
    }
    h1>span.colores {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      -webkit-background-clip: text;
      background-clip: text;
      padding: 0 8px;
    }
    a.boton{
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      border-radius: 8px;
      padding: 8px 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      gap: 10px;
      height: 48px;
      line-height: 16px;
      text-decoration:none;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
      .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 640px){
      #logoBlock-4 {
        max-width: 560px!important;
        width: 100%!important;
      }
    }
  </style>
  </head>
  <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
  <div role="article" aria-roledescription="email" aria-label="">
  <!--[if !mso]><!-- -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
    <tr>
      <td class="mlTemplateContainer" align="center">
      <!--<![endif]-->
      <!--[if mso 16]>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td bgcolor="#f6f8f9" align="center">
        <!--<![endif]-->
      <!-- Contenido -->
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
        <tr>
          <td>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="center">
                                  <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                              <tr>
                                <td align="left" class="bodyTitle">
                                  <h1>¡Su KYC ha sido <span class="colores">APROBADO!</span></h1>
                                </td>
                              </tr>
                            </table>
  
                            </td>
                          </tr>
                        </table>					   
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                    <p>¡Hola ${username}!</p>
                                    <p><br>Nos complace informarte que el proceso de KYC ha sido completado con éxito. ¡Bienvenido oficialmente a bordo!</p>
                                    <p><br>Ahora que has pasado la verificación, puedes disfrutar plenamente de todos nuestros servicios. Estamos emocionados de tenerte como parte de nuestra comunidad y esperamos que encuentres todo lo que necesitas en nuestra plataforma.</p>
                                    <p><br>Si tienes alguna pregunta, comentario o simplemente quieres decir hola, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte en todo lo que necesites.</p>
                                    <p><br>¡Gracias por confiar en nosotros! Esperamos que tu experiencia con nuestros servicios sea excepcional.</p>
                                    <p><br>¡Un abrazo y nos vemos dentro del Club XPERIEND!</p>
                                    <p>Equipo XPERIEND</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                          </tr>
                        </table>              
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" class="">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                <tr>
                                  <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-12">
                                    <p> 
                                      <a class="boton" href="https://www.xperiend.com" target="_blank">XPERIEND.COM</a>
                                      <a class="boton" href="https://xperiend.io" target="_blank">XPERIEND APP</a>
                                    </p>
                                    <p> 
                                      <a href="https://t.me/+efmSPhwyQWk1MmQ0" class="fa fa-telegram" target="_blank"/>
                                      <a href="https://www.instagram.com/xperiend/" class="fa fa-instagram" target="_blank"/>
                                      <a href="https://twitter.com/Xperiendtoken" class="fa fa-twitter" target="_blank"/>
                                      <a href="https://www.linkedin.com/company/xperiend/" class="fa fa-linkedin" target="_blank"/>
                                      <a href="https://www.youtube.com/@xperiend1575" class="fa fa-youtube" target="_blank"/>
                                      <a href="https://m.facebook.com/xperiend/" class="fa fa-facebook" target="_blank"/>
                                      <a href=""></a>
                                      <br><br><br><br><br><br>
                                    </p> 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        <!--[if mso 16]>
        </td>
        </tr>
        </table>
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
      </td>
    </tr>
  </table>
  <!--<![endif]-->
  </div>
  </body>`}
  return transporter.sendMail(mailData);
}
export async function sendKycRechazado(email: string, motivo: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: `Su kyc ha sido rechazado, ${motivo}`,
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentsettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentsettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if mso]>
    <style type="text/css">
      .content-MS .content img { width: 560px; }
    </style>
    <![endif]-->
    <!--[if (mso)|(mso 16)]>
    <style type="text/css">
      .mlContentButton a { text-decoration: none; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <!--<![endif]-->
    <!--[if (lt mso 16)]>
    <style type="text/css" if="variable.bodyBackgroundImage.value">
      .mlBodyBackgroundImage { background-image: none; }
    </style>
    <![endif]-->
    <style type="text/css">
      .ReadMsgBody { width: 100%; }
      .ExternalClass{ width: 100%; }
      .ExternalClass * { line-height: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
      body { margin: 0; padding: 0; }
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table td { border-collapse: collapse; }
      table { border-spacing: 0; border-collapse: collapse; }
      p, a, li, td, blockquote { mso-line-height-rule: exactly; }
      p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      img, a img { border: 0; outline: none; text-decoration: none; }
      img { -ms-interpolation-mode: bicubic; }
      * img[tabindex="0"] + div { display: none !important; }
      a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
      a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
      #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
      #MessageViewBody { width: 100% !important; }
      #MessageWebViewDiv { width: 100% !important; }
      @-moz-document url-prefix() {
        .bodyText p a, .bodyTitle p a {
          word-break: break-word;
        }
      }
      @media screen {
        body {
        font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 500;
        line-height: 24px;
        font-size: 18px;
      color:#fff;
      }
      * {
      direction: ltr;
      }
      }
      @media only screen and (min-width:768px){
        .mlEmailContainer{
          width: 640px!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mlTemplateContainer {
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlTemplateContainer{
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentCenter{
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentTable{
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentBlock{
          display: block !important;
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuter{
          padding-bottom: 0px!important;
          padding-left: 15px!important;
          padding-right: 15px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterSmall{
          padding-bottom: 0px!important;
          padding-left: 10px!important;
          padding-right: 10px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlMenuOuter{
          padding-bottom: 0px!important;
          padding-left: 5px!important;
          padding-right: 5px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterFullBig{
          padding: 30px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage img {
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage160 img {
          height: auto!important;
          max-width: 160px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage260 img {
          height: auto!important;
          max-width: 260px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage{
          height: 100%!important;
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlProductImage{
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentButton a{
          display: block!important;
          width: auto!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mobileHide{
          display: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mobileShow{
          display: block!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter{
          height: auto!important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter img{
          display: inline !important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginBottom{
          margin-bottom: 15px!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginTop {
          margin-top: 10px !important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentHeight{
          height: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlDisplayInline {
          display: inline-block!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlNoFloat{
          float: none!important;
          margin-left: auto!important;
          margin-right: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey{
          float: none!important;
          margin-bottom: 10px!important;
          width:100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey td a{
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .multiple-choice-item-table{
          width: 100% !important;
          margin-bottom: 20px !important;
          min-width: 10% !important;
          float: none !important;
        }
      } @media only screen and (max-width: 640px) {
        body{
          margin: 0px!important;
          padding: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        body, table, td, p, a, li, blockquote{
          -webkit-text-size-adjust: none!important;
        }
      }
      @media only screen and (max-width: 480px){
        .social-LinksTable{
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:first-child{
          padding-left: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:last-child{
          padding-right: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td{
          padding: 0 10px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td img{
          height: auto!important;
          max-width: 48px;
          width: 100%!important;
        }
      }
      .fa {
        padding: 18px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
          /* Carousel style */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .webkit {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .non-webkit {
          display: none !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        /* TARGET OUTLOOK.COM */
        [class="x_non-webkit"] {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        [class="x_webkit"] {
          display: none !important;
        }
      }
    /* estilos custom **/
    .mlbodybackground{
        background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
    }
    h1 {
      font-size: 35px;
      font-style: italic;
      font-weight: 800;
      line-height: 44px;
    }
    h1>span.colores {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      -webkit-background-clip: text;
      background-clip: text;
      padding: 0 8px;
    }
    a.boton{
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      border-radius: 8px;
      padding: 8px 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      gap: 10px;
      height: 48px;
      line-height: 16px;
      text-decoration:none;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
      .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 640px){
      #logoBlock-4 {
        max-width: 560px!important;
        width: 100%!important;
      }
    }
  </style>
  </head>
  <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
  <div role="article" aria-roledescription="email" aria-label="">
  <!--[if !mso]><!-- -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
    <tr>
      <td class="mlTemplateContainer" align="center">
      <!--<![endif]-->
      <!--[if mso 16]>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td bgcolor="#f6f8f9" align="center">
        <!--<![endif]-->
      <!-- Contenido -->
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
        <tr>
          <td>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="center">
                                  <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                              <tr>
                                <td align="left" class="bodyTitle">
                                  <h1>¡Acción requerida para <span class="colores">completar el proceso de KYC!</span></h1>
                                </td>
                              </tr>
                            </table>
  
                            </td>
                          </tr>
                        </table>					   
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                    <p>¡Hola ${username}!</p>
                                    <p><br>Queríamos informarte que, lamentablemente, el proceso de KYC no se ha completado con éxito en esta ocasión. No te preocupes, estamos aquí para ayudarte a resolver cualquier problema que pueda haber surgido.</p>
                                    <p><br>Te pedimos que te pongas en contacto con nuestro equipo de soporte escribiendo a soporte@xperiend.com para obtener más detalles sobre el proceso y asegurarte de completarlo correctamente. Estamos aquí para guiarte y facilitar cualquier información adicional que puedas necesitar.</p>
                                    <p><br>Agradecemos tu comprensión y cooperación en este asunto. Tu satisfacción y seguridad son nuestras principales prioridades, y estamos comprometidos en resolver cualquier problema de manera rápida y eficiente.</p>
                                    <p><br>Esperamos tu pronta respuesta y estamos aquí para ayudarte en todo lo que necesites.</p>
                                    <p><br>Saludos cordiales,</p>
                                    <p>Equipo XPERIEND</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                          </tr>
                        </table>              
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" class="">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                <tr>
                                  <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-12">
                                    <p> 
                                      <a class="boton" href="https://www.xperiend.com" target="_blank">XPERIEND.COM</a>
                                      <a class="boton" href="https://xperiend.io" target="_blank">XPERIEND APP</a>
                                    </p>
                                    <p> 
                                      <a href="https://t.me/+efmSPhwyQWk1MmQ0" class="fa fa-telegram" target="_blank"/>
                                      <a href="https://www.instagram.com/xperiend/" class="fa fa-instagram" target="_blank"/>
                                      <a href="https://twitter.com/Xperiendtoken" class="fa fa-twitter" target="_blank"/>
                                      <a href="https://www.linkedin.com/company/xperiend/" class="fa fa-linkedin" target="_blank"/>
                                      <a href="https://www.youtube.com/@xperiend1575" class="fa fa-youtube" target="_blank"/>
                                      <a href="https://m.facebook.com/xperiend/" class="fa fa-facebook" target="_blank"/>
                                      <a href=""></a>
                                      <br><br><br><br><br><br>
                                    </p> 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        <!--[if mso 16]>
        </td>
        </tr>
        </table>
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
      </td>
    </tr>
  </table>
  <!--<![endif]-->
  </div>
  </body>`}
  return transporter.sendMail(mailData);
}
export async function sendKycRellenado(email: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "KYC PENDIENTE",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentsettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentsettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if mso]>
    <style type="text/css">
      .content-MS .content img { width: 560px; }
    </style>
    <![endif]-->
    <!--[if (mso)|(mso 16)]>
    <style type="text/css">
      .mlContentButton a { text-decoration: none; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <!--<![endif]-->
    <!--[if (lt mso 16)]>
    <style type="text/css" if="variable.bodyBackgroundImage.value">
      .mlBodyBackgroundImage { background-image: none; }
    </style>
    <![endif]-->
    <style type="text/css">
      .ReadMsgBody { width: 100%; }
      .ExternalClass{ width: 100%; }
      .ExternalClass * { line-height: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
      body { margin: 0; padding: 0; }
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table td { border-collapse: collapse; }
      table { border-spacing: 0; border-collapse: collapse; }
      p, a, li, td, blockquote { mso-line-height-rule: exactly; }
      p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      img, a img { border: 0; outline: none; text-decoration: none; }
      img { -ms-interpolation-mode: bicubic; }
      * img[tabindex="0"] + div { display: none !important; }
      a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
      a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
      #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
      #MessageViewBody { width: 100% !important; }
      #MessageWebViewDiv { width: 100% !important; }
      @-moz-document url-prefix() {
        .bodyText p a, .bodyTitle p a {
          word-break: break-word;
        }
      }
      @media screen {
        body {
        font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 500;
        line-height: 24px;
        font-size: 18px;
      color:#fff;
      }
      * {
      direction: ltr;
      }
      }
      @media only screen and (min-width:768px){
        .mlEmailContainer{
          width: 640px!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mlTemplateContainer {
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlTemplateContainer{
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentCenter{
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentTable{
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentBlock{
          display: block !important;
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuter{
          padding-bottom: 0px!important;
          padding-left: 15px!important;
          padding-right: 15px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterSmall{
          padding-bottom: 0px!important;
          padding-left: 10px!important;
          padding-right: 10px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlMenuOuter{
          padding-bottom: 0px!important;
          padding-left: 5px!important;
          padding-right: 5px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterFullBig{
          padding: 30px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage img {
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage160 img {
          height: auto!important;
          max-width: 160px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage260 img {
          height: auto!important;
          max-width: 260px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage{
          height: 100%!important;
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlProductImage{
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentButton a{
          display: block!important;
          width: auto!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mobileHide{
          display: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mobileShow{
          display: block!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter{
          height: auto!important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter img{
          display: inline !important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginBottom{
          margin-bottom: 15px!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginTop {
          margin-top: 10px !important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentHeight{
          height: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlDisplayInline {
          display: inline-block!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlNoFloat{
          float: none!important;
          margin-left: auto!important;
          margin-right: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey{
          float: none!important;
          margin-bottom: 10px!important;
          width:100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey td a{
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .multiple-choice-item-table{
          width: 100% !important;
          margin-bottom: 20px !important;
          min-width: 10% !important;
          float: none !important;
        }
      } @media only screen and (max-width: 640px) {
        body{
          margin: 0px!important;
          padding: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        body, table, td, p, a, li, blockquote{
          -webkit-text-size-adjust: none!important;
        }
      }
      @media only screen and (max-width: 480px){
        .social-LinksTable{
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:first-child{
          padding-left: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:last-child{
          padding-right: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td{
          padding: 0 10px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td img{
          height: auto!important;
          max-width: 48px;
          width: 100%!important;
        }
      }
      .fa {
        padding: 18px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      /* Carousel style */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .webkit {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .non-webkit {
          display: none !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        /* TARGET OUTLOOK.COM */
        [class="x_non-webkit"] {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        [class="x_webkit"] {
          display: none !important;
        }
      }
    /* estilos custom **/
    .mlbodybackground{
        background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
    }
    h1 {
      font-size: 35px;
      font-style: italic;
      font-weight: 800;
      line-height: 44px;
    }
    h1>span.colores {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      -webkit-background-clip: text;
      background-clip: text;
      padding: 0 8px;
    }
    a.boton{
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      border-radius: 8px;
      padding: 8px 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      gap: 10px;
      height: 48px;
      line-height: 16px;
      text-decoration:none;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
      .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 640px){
      #logoBlock-4 {
        max-width: 560px!important;
        width: 100%!important;
      }
    }
  </style>
  </head>
  <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
  <div role="article" aria-roledescription="email" aria-label="">
  <!--[if !mso]><!-- -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
    <tr>
      <td class="mlTemplateContainer" align="center">
      <!--<![endif]-->
      <!--[if mso 16]>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td bgcolor="#f6f8f9" align="center">
        <!--<![endif]-->
      <!-- Contenido -->
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
        <tr>
          <td>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="center">
                                  <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                              <tr>
                                <td align="left" class="bodyTitle">
                                  <h1>¡Gracias por <span class="colores">rellenar su KYC!</span></h1>
                                </td>
                              </tr>
                            </table>
  
                            </td>
                          </tr>
                        </table>					   
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                    <p>¡Hola ${username}!</p>
                                    <p><br>Gracias por completar el proceso de KYC de manera tan eficiente. Queríamos informarte de que hemos recibido toda la información necesaria. Ahora, nuestro equipo realizará la revisión correspondiente, y te aseguramos que tendrás una respuesta en un plazo máximo de 15 días.</p>
                                    <p><br>Agradecemos tu paciencia y colaboración durante este proceso. Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nuestro equipo de soporte en soporte@xperiend.com. Estamos aquí para ayudarte en cualquier momento.</p>
                                    <p><br>Nuevamente, gracias por tu colaboración y confianza.</p>
                                    <p>Saludos cordiales,</p>
                                    <p>Equipo XPERIEND</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                          </tr>
                        </table>              
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" class="">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                <tr>
                                  <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-12">
                                    <p> 
                                      <a class="boton" href="https://www.xperiend.com" target="_blank">XPERIEND.COM</a>
                                      <a class="boton" href="https://xperiend.io" target="_blank">XPERIEND APP</a>
                                    </p>
                                    <p> 
                                      <a href="https://t.me/+efmSPhwyQWk1MmQ0" class="fa fa-telegram" target="_blank"/>
                                      <a href="https://www.instagram.com/xperiend/" class="fa fa-instagram" target="_blank"/>
                                      <a href="https://twitter.com/Xperiendtoken" class="fa fa-twitter" target="_blank"/>
                                      <a href="https://www.linkedin.com/company/xperiend/" class="fa fa-linkedin" target="_blank"/>
                                      <a href="https://www.youtube.com/@xperiend1575" class="fa fa-youtube" target="_blank"/>
                                      <a href="https://m.facebook.com/xperiend/" class="fa fa-facebook" target="_blank"/>
                                      <a href=""></a>
                                      <br><br><br><br><br><br>
                                    </p> 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        <!--[if mso 16]>
        </td>
        </tr>
        </table>
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
      </td>
    </tr>
  </table>
  <!--<![endif]-->
  </div>
  </body>`}
  return transporter.sendMail(mailData);
}

export async function sendTransferenciaRecibida(email: string,username:string) {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "Transferencia recibida",
    html: `<head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentsettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentsettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if mso]>
    <style type="text/css">
      .content-MS .content img { width: 560px; }
    </style>
    <![endif]-->
    <!--[if (mso)|(mso 16)]>
    <style type="text/css">
      .mlContentButton a { text-decoration: none; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <!--<![endif]-->
    <!--[if (lt mso 16)]>
    <style type="text/css" if="variable.bodyBackgroundImage.value">
      .mlBodyBackgroundImage { background-image: none; }
    </style>
    <![endif]-->
    <style type="text/css">
      .ReadMsgBody { width: 100%; }
      .ExternalClass{ width: 100%; }
      .ExternalClass * { line-height: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
      body { margin: 0; padding: 0; }
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table td { border-collapse: collapse; }
      table { border-spacing: 0; border-collapse: collapse; }
      p, a, li, td, blockquote { mso-line-height-rule: exactly; }
      p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      img, a img { border: 0; outline: none; text-decoration: none; }
      img { -ms-interpolation-mode: bicubic; }
      * img[tabindex="0"] + div { display: none !important; }
      a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
      a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
      #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
      #MessageViewBody { width: 100% !important; }
      #MessageWebViewDiv { width: 100% !important; }
      @-moz-document url-prefix() {
        .bodyText p a, .bodyTitle p a {
          word-break: break-word;
        }
      }
      @media screen {
        body {
        font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 500;
        line-height: 24px;
        font-size: 18px;
      color:#fff;
      }
      * {
      direction: ltr;
      }
      }
      @media only screen and (min-width:768px){
        .mlEmailContainer{
          width: 640px!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mlTemplateContainer {
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlTemplateContainer{
          padding: 10px 10px 0 10px;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentCenter{
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentTable{
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentBlock{
          display: block !important;
          width: 100%!important;
          min-width: 10%!important;
          margin: 0!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuter{
          padding-bottom: 0px!important;
          padding-left: 15px!important;
          padding-right: 15px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterSmall{
          padding-bottom: 0px!important;
          padding-left: 10px!important;
          padding-right: 10px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlMenuOuter{
          padding-bottom: 0px!important;
          padding-left: 5px!important;
          padding-right: 5px!important;
          padding-top: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentOuterFullBig{
          padding: 30px!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage img {
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage160 img {
          height: auto!important;
          max-width: 160px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage260 img {
          height: auto!important;
          max-width: 260px;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentImage{
          height: 100%!important;
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlProductImage{
          height: auto!important;
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentButton a{
          display: block!important;
          width: auto!important;
        }
      }
      @media only screen and (max-width: 640px) {
        .mobileHide{
          display: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mobileShow{
          display: block!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter{
          height: auto!important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .alignCenter img{
          display: inline !important;
          text-align: center!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginBottom{
          margin-bottom: 15px!important;
        }
      } @media only screen and (max-width: 640px) {
        .marginTop {
          margin-top: 10px !important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentHeight{
          height: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlDisplayInline {
          display: inline-block!important;
          float: none!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlNoFloat{
          float: none!important;
          margin-left: auto!important;
          margin-right: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey{
          float: none!important;
          margin-bottom: 10px!important;
          width:100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .mlContentSurvey td a{
          width: auto!important;
        }
      } @media only screen and (max-width: 640px) {
        .multiple-choice-item-table{
          width: 100% !important;
          margin-bottom: 20px !important;
          min-width: 10% !important;
          float: none !important;
        }
      } @media only screen and (max-width: 640px) {
        body{
          margin: 0px!important;
          padding: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        body, table, td, p, a, li, blockquote{
          -webkit-text-size-adjust: none!important;
        }
      }
      @media only screen and (max-width: 480px){
        .social-LinksTable{
          width: 100%!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:first-child{
          padding-left: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td:last-child{
          padding-right: 0px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td{
          padding: 0 10px!important;
        }
      } @media only screen and (max-width: 640px) {
        .social-LinksTable td img{
          height: auto!important;
          max-width: 48px;
          width: 100%!important;
        }
      }
      .fa {
        padding: 18px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      /* Carousel style */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .webkit {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .non-webkit {
          display: none !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        /* TARGET OUTLOOK.COM */
        [class="x_non-webkit"] {
          display: block !important;
        }
      }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
        [class="x_webkit"] {
          display: none !important;
        }
      }
    /* estilos custom **/
    .mlbodybackground{
        background: linear-gradient(121.35deg,rgba(229,24,186,.4) -12.07%,rgba(229,24,186,0) 44.14%),#330a6b;
    }
    h1 {
      font-size: 35px;
      font-style: italic;
      font-weight: 800;
      line-height: 44px;
    }
    h1>span.colores {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      -webkit-background-clip: text;
      background-clip: text;
      padding: 0 8px;
    }
    a.boton{
        background: linear-gradient(90.03deg,#e518ba .03%,#eb5b13 99.97%);
      border-radius: 8px;
      padding: 8px 16px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      gap: 10px;
      height: 48px;
      line-height: 16px;
      text-decoration:none;
    }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
      .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
      .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
      .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 640px){
      #logoBlock-4 {
        max-width: 560px!important;
        width: 100%!important;
      }
    }
  </style>
  </head>
  <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
  <div role="article" aria-roledescription="email" aria-label="">
  <!--[if !mso]><!-- -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mainTable mlBodyBackground" dir="ltr">
    <tr>
      <td class="mlTemplateContainer" align="center">
      <!--<![endif]-->
      <!--[if mso 16]>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td bgcolor="#f6f8f9" align="center">
        <!--<![endif]-->
      <!-- Contenido -->
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   " width="640">
        <tr>
          <td>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td align="center">
                                  <a href="https://xperiendv3.netlify.app/"><img src="https://xperiendv3.netlify.app/static/media/text-white.f7277f86eb98f0424f9e34d4266a9720.svg" id="logoBlock-4" border="0" alt="" width="560" style="display: block;"></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
  
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                              <tr>
                                <td align="left" class="bodyTitle">
                                  <h1>¡Confirmación de Compra, <span class="colores">Ya eres miembro del club!</span></h1>
                                </td>
                              </tr>
                            </table>
  
                            </td>
                          </tr>
                        </table>					   
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-8"><p><br></p>
                                    <p>¡Hola ${username}!</p>
                                    <p><br>Espero que estés bien. Nos complace informarte que hemos recibido con éxito tu transferencia. Como resultado, hemos enviado los tokens correspondientes a tu wallet.</p>
                                    <p><br>Te invitamos a visitar el dashboard de nuestra aplicación para verificar y confirmar tu compra. En caso de que encuentres alguna discrepancia o tengas alguna pregunta, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                                    <p><br>Agradecemos tu confianza en nosotros y esperamos que disfrutes de tus nuevos tokens. Si hay algo más en lo que podamos ayudarte, estamos aquí para brindarte asistencia.</p>
                                    <p><br>Gracias nuevamente por elegirnos.</p>
                                    <p><br>Saludos cordiales,</p>
                                    <p>Equipo XPERIEND</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
                          </tr>
                        </table>              
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" class="">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-top: 1px solid #e717bc; border-collapse: initial;" class="">
                                <tr>
                                  <td height="20" class="spacingHeight-20" style="line-height: 20px; min-height: 20px;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0"  class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
              <tr>
                <td class="mlContentTableCardTd">
                  <table align="center"  border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
                          </tr>
                        </table>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
                          <tr>
                            <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                <tr>
                                  <td class="bodyTitle" id="bodyText-12">
                                    <p> 
                                      <a class="boton" href="https://www.xperiend.com" target="_blank">XPERIEND.COM</a>
                                      <a class="boton" href="https://xperiend.io" target="_blank">XPERIEND APP</a>
                                    </p>
                                    <p> 
                                      <a href="https://t.me/+efmSPhwyQWk1MmQ0" class="fa fa-telegram" target="_blank"/>
                                      <a href="https://www.instagram.com/xperiend/" class="fa fa-instagram" target="_blank"/>
                                      <a href="https://twitter.com/Xperiendtoken" class="fa fa-twitter" target="_blank"/>
                                      <a href="https://www.linkedin.com/company/xperiend/" class="fa fa-linkedin" target="_blank"/>
                                      <a href="https://www.youtube.com/@xperiend1575" class="fa fa-youtube" target="_blank"/>
                                      <a href="https://m.facebook.com/xperiend/" class="fa fa-facebook" target="_blank"/>
                                      <a href=""></a>
                                      <br><br><br><br><br><br>
                                    </p> 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        <!--[if mso 16]>
        </td>
        </tr>
        </table>
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
      </td>
    </tr>
  </table>
  <!--<![endif]-->
  </div>
  </body>`}
  return transporter.sendMail(mailData);
}