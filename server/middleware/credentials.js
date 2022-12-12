import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {      
        res.header('Access-Control-Allow-Credentials', true)
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")  
        res.header('Access-Control-Allow-Origin', origin)
    }
    next();
}

export default credentials