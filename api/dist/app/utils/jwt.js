/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken";
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}
function generateRefreshToken(user, req) {
    req.session.refreshToken = [];
    const token = req.session.refreshToken;
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
    token.push(refreshToken);
    return refreshToken;
}
function refreshToken(req, res) {
    if (req.session.refreshToken?.length === 0) {
        const user = req.user;
        //delete old token and replace with new token
        const accessToken = generateAccessToken({ user });
        const refreshToken = generateRefreshToken({ user }, req);
        //generate a new accessToken and refreshToken
        return res.status(200).json({ accessToken, refreshToken });
    }
}
export { generateAccessToken, generateRefreshToken, refreshToken };
