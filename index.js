const mongoose = require("mongoose");
const app = require("./app.js");
require("dotenv").config();
const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server run http://${host}:${port}`);
});

try {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err) {
      if (err) throw err;
      console.log("kết nối DB thành công!");
    }
  );
} catch (err) {
  console.log(err);
}
