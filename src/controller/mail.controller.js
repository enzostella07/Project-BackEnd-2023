import nodemailer from 'nodemailer';

class mailController{
    transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });
    
    sendMail = async (req, res) => {
      const result = await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: 'facus.stella@gmail.com ',
        subject: 'ona 🐢',
        html: `
                  <div>
                      <h1>Prueba test nodemailing</h1>
                      <p>prueba a facu</p>
                      <img src="cid:turtle1" />
                  </div>
              `,
        attachments: [
          {
            filename: 'turtle.gif',
            path: __dirname + '/images/turtle.gif',
            cid: 'turtle1',
          },
        ],
      });
      res.send('Email sent');
    }

}

export default new mailController();