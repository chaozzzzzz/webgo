import dotenv from 'dotenv'
dotenv.config()

const allowedOrigins = [
  `${process.env.REACT_APP_API_BASE_URL}`,
  `${process.env.REACT_APP_BASE_URL}`,
]

export default allowedOrigins;