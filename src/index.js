import dbConnection from "./connection/index.js";
import app  from "./app.js"
import chalk from "chalk";

dbConnection().then(()=>{
    app.listen(3000, () => {
        console.log(chalk.blue("Server running on port 3000"));
    });
 
}).catch(err=>{
    console.log(chalk.red(err));
    
})