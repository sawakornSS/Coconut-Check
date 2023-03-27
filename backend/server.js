const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const nodemailer = require('nodemailer');

const app = express();

//cors
var corsOptions = {
  origin: "http://localhost:8080/",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// routers
require("./routes/user_router.js")(app);
require("./routes/room_router.js")(app);

// set port
const PORT = process.env.PORT || 3000;
// server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

//socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);
io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("inputData", async function (id, data, dataEmail) {
    var ip = require("ip");
    data.Device = ip.address(); // set data.device recive = ip client
    // Set send an Email 
    const hbs = require('nodemailer-express-handlebars') //
    const path = require('path')
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'informaticscoconut@gmail.com',
        pass: 'rlwpukdjewnunqyg'
      }
    });
    console.log(dataEmail)
    // point to the template folder
      const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
      };
    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))  
          
    var mailOptions = {
      from: 'CoconutCheck BUU <informaticscoconut@gmail.com>',
      to: data.Email,
      subject: '(ยืนยันเข้าร่วมกิจกรรม) ยืนยันการเข้าร่วมกิจกรรม ' + dataEmail.name + ' เมื่อวันที่ ' + dataEmail.startDate + ' - ' + dataEmail.endDate 
              + ' เวลา ' + dataEmail.startTime + '-' + dataEmail.endTime + 'น.',
      template: 'email', // the name of the template file i.e email.handlebars
        context:{
            name: dataEmail.name, // replace {{name}} with Adebola
            palce: dataEmail.palce, // replace {{company}} with My Company
            owner: dataEmail.owner,
            startDate: dataEmail.startDate,
            endDate: dataEmail.endDate,
            startTime: dataEmail.startTime,
            endTime: dataEmail.endTime
        }
    };
    //send email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    io.emit("sendData_device", data.Device);
    io.emit("sendData", id, data);
  });

  socket.on("socketRoom", async function (codeRoom) {
    io.emit("sendData_socketRoom", codeRoom);
  });

  socket.on("CodeRoom", async function (codeRoom) {
    io.emit("sendData_CodeRoom", codeRoom);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  // ===check user ก่อนจะเพิ่มข้อมูล
    // socket.on("checkUser", async function (roomId, dataUser) {
    //   io.emit("sendData_checkUser", roomId, dataUser);
    // });
  // ===check user ก่อนจะเพิ่มข้อมูล

});


http.listen(PORT, function () {
  console.log(`listening on *:${PORT}`);
});
