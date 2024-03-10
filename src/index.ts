
import app from "./app.js";
import { connectionToDB } from "./db/connection.js";
//connections and listeners
const PORT = process.env.PORT || 5000;
connectionToDB().then(() =>
{
  app.listen(PORT, () => {
    console.log('DB connected & Server is running on port 5000 🚀')
  })
}
)
.catch(err => console.log(err))
;
