const {
  getUserByEmail,
  checkIfUserExistById,
} = require("../services/userServices");
const { verifyPassword } = require("../helpers/passwordHelpers");
const { generateToken, verifyToken } = require("../helpers/jwtHelpers");
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../lib/index");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await getUserByEmail(email);

    if (userExist) {
      /// check if user's password is correct
      const passwordIsValid = await verifyPassword(
        password,
        userExist?.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({ error: "Invalid login credentials" });
      }

      // generate authorization token for the user
      const payload = {
        userId: userExist.id,
        email: userExist.email,
      };
      const accessToken = generateToken(
        payload,
        JWT_SECRET,
        ACCESS_TOKEN_EXPIRES_IN
      );
      // generate new access token
      const refreshToken = generateToken(
        payload,
        JWT_SECRET,
        REFRESH_TOKEN_EXPIRES_IN
      );

      const cookieOptions = {
        expires: new Date(Date.now() + 3600),
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // generate new refresh token
      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
          message: "login successfully",
          data: { refreshToken },
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getNewAccessToken = async (req, res) => {
  try {
    const refreshToken = req.headers["authorization"];

    if (!refreshToken) {
      return res.status(403).json({ error: "invalid token" });
    }

    if (refreshToken.split(" ")[0] !== "Bearer")
      return res.status(403).json({ error: "invalid token" });

    const payload = verifyToken(refreshToken.split(" ")[1], JWT_SECRET);

    if (!payload) {
      return res.status(403).json({ error: "invalid token" });
    }

    const userExist = await checkIfUserExistById(payload.userId);

    if (!userExist) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const accessTokenPayload = {
      userId: userExist?.id,
      email: userExist?.email,
    };

    const accessToken = generateToken(
      accessTokenPayload,
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 3600),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json({
        message: "token generated successfully",
      });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    // generate new refresh token
    return res.clearCookie("accessToken").json({
      message: "logout successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = { loginUser, getNewAccessToken, logoutUser };
