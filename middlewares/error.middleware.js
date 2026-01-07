export default (err, req, res, next) => {
  console.error(err); 

  res.status(422).json({
    errors: {
      message: err.message || "Something went wrong"
    }
  });
};
