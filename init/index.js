const initdata = require("./initData.js")
const mongoose  = require("mongoose")
const Listing = require("../models/listings.js")
// main()
// .then(()=>{
//     console.log("connection successful...")
// })
// .catch((e)=>{
//     console.log(e)
// })
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}
const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
main()
  .then(() => {
    console.log("Connection successful...");
    return initDB(); // ✅ Wait for DB init after connection
  })
  .catch((e) => {
    console.log("Error:", e);
  });


