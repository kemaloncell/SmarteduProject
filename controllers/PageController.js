const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  // console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const outputMessage = ` 
    <h1> Mail Details </h1>
    <ul>
      <li>Name:${req.body.name}</li>
      <li>Email:${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'kemaloncel0909@gmail.com', // gmail account
        pass: 'nybueetfsttxoofl', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart edu contanct form" <kemaloncel0909@gmail.com>', // sender address
      to: 'kemalloncel@gmail.com', // list of receivers
      subject: 'Smart edu contanct form" ✔', // Subject line
      html: outputMessage,
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    req.flash('success', 'We Received your message succesfuly');
    res.status(200).redirect('contact');
  } catch (error) {
    req.flash('error', `Something happend!`);
    // req.flash('error', `Something happend! ${error}`);
    res.status(200).redirect('contact');
  }
};
