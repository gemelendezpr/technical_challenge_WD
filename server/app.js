const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors")

const phonesData = require("./data/phones.json");

app.use(express.json());

app.use(cors());

// Route to get all phones
app.get("/phones", (req, res) => {
  res.json(phonesData);
});

// Route to get phone details by id
app.get('/phones/:phoneId', function(req, res, next){
    const { phoneId } = req.params;
    return res.status(200).json(phonesData.find((phone) => phone.id === Number(phoneId)));
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });

module.exports = app;