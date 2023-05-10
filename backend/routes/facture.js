const nodemailer =require("nodemailer")
const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.post("/:id", async (req, res)=>{

    try{
        const orderid = req.params.id;
        const factureQuery = 'SELECT U.UserName, U.UserEmail, P.ProductName, P.ProductPrice,ItemQuantity,OrderSubtotal, OrderDate FROM Orders INNER JOIN Users as U ON Orders.UserID=U.UserID INNER JOIN Products as P ON Orders.ProductID=P.ProductID WHERE OrderID=?  ';
        const result = await pool.query(factureQuery, orderid);
        console.log(result)
        let HTMLmessage= `  <div>
      <img src="https://media.discordapp.net/attachments/1100763066557284353/1100764003573186633/SharedScreenshot.jpg?width=293&height=305" width="55" height="55" alt="logolinformateur">
          
          <p>Bonjour,<br>  L'équipe linformateur vous remercie pour votre commande.<br> Pour confirmer votre commande vous devez la payer par virement bancaire au BE0000000000000
          avec comme communication votre numéro de commande.<br> Votre commande sera envoyer le lundi de la semaine suivant la reception votre paiement.
          <br>En cas de non paiement dans les 10 jours ouvrables, linformateur annulera votre commande.
          
          </p>
          
          <p>
          
            <h1> facturation: </h1>
          
          </p>
          
          <table style="width:75%; text-align: center">
          
            <tr>
          
                <th> N° de commande</th>
                <th> Produit </th>
                <th> Quantité</th>
                <th> Date </th>
                <th> Prix </th>
                <th> Prix Total </th>
            </tr>
            <tr>
                <td> `+ orderid +` </td>
                <td> `+ result[0].ProductName +` </td>
                <td> `+ result[0].ProductQuantity +` </td>
                <td> `+ result[0].OrderDate +` </td>
                <td> `+ result[0].ProductPrice +`€  </td>
                <td> `+ result[0].OrderSubtotal +`€  </td>
            </tr>
           </table>
            <br>
            <br>
            <br>
              <div> En vous vous remerciant, L'équipe linformateur </div>
            <br>
            <br><br>
                <a href="https://www.linformateur.tech">Retrouvez-nous sur linformateur.tech</a>
            <br>
            <br>
                <a href="mailto:info@linformateur.tech">Une question ? Contactez-nous</a>
            `

        const transporter = nodemailer.createTransport({
            host: "pro1.mail.ovh.net",
            port: 587,
            secure: false,
            auth: {
                Users: "info@linformateur.tech",
                pass: process.env.SECRETMAIL
            }
        });
        const mailOptions = {
            from: "info@linformateur.tech",
            to: result[0].UsersEmail,
            subject: "Facture de la commande" + orderid,
            html: HTMLmessage
        };
        transporter.sendMail(mailOptions);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;
