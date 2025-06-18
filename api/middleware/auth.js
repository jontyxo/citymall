
module.exports = (req, res, next) => {
  req.user = {
    id: 'e9fb6d76-5f4b-46a5-adf2-454bd0e73605', 
    email: 'admin@example.com'
  };
  next();
};
