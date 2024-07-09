export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("You need to login")

        jwt.verify(token, process.env.JWTToken, (err, decoded) => {
            if (err) return res.status(403).json("Invalid token please login again")
            req.user = user;
            next();
        })
}