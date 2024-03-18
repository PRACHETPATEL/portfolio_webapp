const checkLoginStatus = (req, res) => {
  const check = req.cookies.logged_in
  if (check) {
    res.json({ status: 200 })
  } else {
    res.json({ status: 404 })
  }
}
module.exports=checkLoginStatus;