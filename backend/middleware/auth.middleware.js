const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {

    try {

        let token;

        // Get the access token from the cookie

        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }


        // else get the token from the bearer token

        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {

            return res.status(404).json({
                success: false,
                message: "Unauthorized request"
            })
        }

        // decode the token

        const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECERT_KEY)

        if (decode == null) {
            return res.status(404).json({
                success: false,
                message: "Unquthorized token"
            })
        }

        req.user = decode;

        next()

    } catch (error) {
        console.log("Auth Middleware error ", error);
        return res.status(500).json({
            success: false,
            message: "Internal sever"
        })
    }
}

module.exports = { authMiddleware }