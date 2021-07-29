const mongoose = require("mongoose");
const URI = `mongodb+srv://aryanydv281:${
    process.env.PASSWORD
}@cluster0.dmeot.mongodb.net/${
    process.env.DATABASENAME
}?retryWrites=true&w=majority`;
mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection is  established succesfully!!");
}).catch((err) => {
    console.log(err);
})
