export default (err, req, res, next) => {
  console.error(err); // log complet pour debug

  res.status(err.status || 500).json({
    errors: {
      message: err.message || "Something went wrong"
    }
  });
};

