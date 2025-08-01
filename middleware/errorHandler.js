const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Something went wrong!",
      version: req.apiVersion || "unknown",
    });
  };
  
  export default errorHandler;
  