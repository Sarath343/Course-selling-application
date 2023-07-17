const jwt = require('jsonwebtoken');
const secret = 'sEcr3t';
function authenticateJwt(req, res, next) {
    const auth = req.headers.authorization;  // 'a' is in small case but while sending the request the paramter will be in caps only 
    if (!auth) {
        return res.status(403).json({ message: "Authorization is missing " })
    }
    const token = auth.split(" ")[1];
    jwt.verify(token, secret, (err, admin) => {
        if (err) {
            return res.status(403).json({ message: "re-login required " });
        }
        req.admin = admin;
        next();
    })
}
module.exports = {
    authenticateJwt,
    secret
}