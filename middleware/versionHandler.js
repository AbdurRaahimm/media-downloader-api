const versionHandler = (version) => (req, res, next) => {
    req.apiVersion = version;
    res.setHeader("X-API-Version", version);
    next();
  };
  
  export default versionHandler;
  