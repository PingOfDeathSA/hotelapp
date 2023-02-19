//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");
mongoose.set('strictQuery', true);
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// conecting with cloud database
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/HotelDB');
// Hotel number generator
var HotelNumber = Math.random();
HotelNumber = Math.floor(HotelNumber *5)+1;
var current_Key = "2023"+HotelNumber
// data structure requirements
const hotelSchema = new mongoose.Schema({
    Hotel_key: {type:Number,requred:true},
  name: { type: String, required: true },
  picture1: { type:String, required: true},
  picture2: { type:String, required: true},
  picture3: { type:String, required: true},
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  available_dates: { type: [Date], required: true},
});
// linkinng  the data with the structure schema
const HotelModel = mongoose.model('Hotel', hotelSchema);
// adding informaitin inside the model
const HotelSave = new HotelModel({
    Hotel_key: current_Key,
   name: "Hotel D",
   picture1: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600",
  picture2:  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1600",
  picture3:  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600",
  rating: { type: Number, required: true },
    rating: 4.3,
    location: "San Francisco",
    price: 250,
    available_dates: [
      "2023-03-15",
      "2023-03-16",
      "2023-03-17"
    ]
  });
// Building APIs
// // app.get() his is an HTTP method used to retrieve data from a server or database. In the context of an API


app.get("/",  (req, res) => {
  HotelModel.find(
    {  }, //filtter
    
    function (err, Details_of_Hotel) {

    if (err) {
      console.log(err)
      
    } else { console.log(Details_of_Hotel)}

    res.render("MyHotels", {listTitle: "Today", Hotel: Details_of_Hotel});
  });
  });
  app.get('/Bookings.html', (req, res) => {
    const checkedid = req.body.selectedLocation;
    console.log("Selected Location: ", checkedid);
  
    HotelModel.find(
      
      { location: checkedid },
      
      function (err, Details_of_Hotel) {
  
      if (err) {
        console.log(err)
        
      } else { console.log(Details_of_Hotel)}
  
      res.render("Bookings", {listTitle: "Today", Hotel: Details_of_Hotel});
     
  
    });
  });

  // Getting user input API
  app.post("/", function(req, res){

    const   Fist_Name1 = req.body.newItem;
    const learnerSave = new Learnermodel(
      {
        
        // LearnerT: learnerTeacher,
        Gender:"F",
      
        Leaner_Profile_Picture:"https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address:"Jane Furse",
        
        email_adsress:
        "Goad-C@school.co.za",
        
        grade_number:
        "9F",
        Fist_Name: Fist_Name1,
        Last_Name: "Phahlamohlaka",
        Student_Number:currentSN
      
      
      });
  
  //  learnerSave.save().then(() => res.redirect("/Mylearners.html"));
  
  });
  app.post("/search", function (req, res) {
    const checkedid = req.body.selectedLocation;
    console.log("Selected Location: ", checkedid);
    HotelModel.find(
      { location: checkedid },
      function (err, Details_of_Hotel) {
        if (err) {
          console.log(err);
        } else {
          console.log("Details of Hotel: ", Details_of_Hotel);
          res.render("MyHotels", { listTitle: "Today", Hotel: Details_of_Hotel });
        }
      }
    );
  });





  




//   geting the local server up and runing
  app.listen(3000, function() {
    console.log("Server started on port 3000");     
  });

  //   validation data before sending to database to avoid duplicates
 const hotel_validator = current_Key;
 const hotelname_valida = "Hotel D";
 // here im checking if the entered data exists in the database
 HotelModel.find({ Hotel_key: hotel_validator },{ name: hotelname_valida }, function (err, Hotels) {
     if (Hotels.some((Hotel) => Hotel.Hotel_key === hotel_validator) ||Hotels.some((Hotel) => Hotel.name === hotelname_valida) ) {
       console.log("Hotel already exists");
     } else {  
          HotelSave.save().then(() => console.log('Hotels added'));
      }
   });