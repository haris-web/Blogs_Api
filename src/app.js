import express, { urlencoded } from "express"
import cors from "cors"
// import cookieParser from "cookie-parser"


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
  
}))
app.use(express.static("public"))
// app.use(cookieParser())


//router
import blogRoutes from  "./routers/blog.route.js"

app.use("/api/v1/",blogRoutes )


export default app