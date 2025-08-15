const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listings.js")
const path = require("path")
const methodOverride = require("method-override")
const engine = require("ejs-mate")
app.engine("ejs" , engine)
// app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(methodOverride("_method"))
app.set("view engine"  , "ejs")
app.set("views" , path.join(__dirname , "/views/listings"))
app.use(express.static(path.join(__dirname , "/public")))

main()
.then(()=>{
    console.log("connection successful...")
})
.catch((e)=>{
    console.log(e)
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}
const port = 8080;
app.use(express.urlencoded({extended:true}))

app.listen(port , ()=>{
    console.log("listening ...")
})
app.get("/" , (req , res)=>{
    res.send("Hi , i am airbnb")
})
// app.get("/test" , async (req , res)=>{
//     let newlisting = new Listing({
//         title:"New Hotel" ,
//         description:"This is a nice hotel" ,
//         image: "https//wallpapers.com/images/hd/hotel-pictures-qlav23mu7ir1ch6j.jpg" , 
//         price :2000 ,
//         location:"Tirupati" ,
//         country:"India"
//     })
//     await newlisting.save()
//     res.send("working")
// })
// index route ........................................
app.get("/listings" , async (req , res)=>{
    let allListings = await Listing.find({})
    // console.log(allListings)
    res.render("listings.ejs" , {allListings})
})

// create new listing route
app.get("/listings/new" ,  (req , res)=>{
    res.render("create.ejs");
})
// adding new list into database
app.post("/listings" , async (req , res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save()
    res.redirect("listings")
})
// route for each item
app.get("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    let listing =  await Listing.findById(id)
    res.render("show.ejs" ,{listing} )
})
// edit route
app.get("/listings/:id/edit" , async (req , res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    console.log(listing)
    res.render("edit.ejs" , {listing})
})
// updata route
app.put("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing})
    res.redirect("/listings/:id/")
})
// Delete route
app.delete("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
})
