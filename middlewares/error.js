const  ErrorHander =require("./errorhandler.js");


const handler = (err, req, res,next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  
  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHander(message, 400);
  }
  // Duplicate key error
  if (err.code === 11000) {
    console.log(err)
    const message = `Sorry this user already exist`;
    err = new ErrorHander(message, 400);
  }


  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
module.exports= handler