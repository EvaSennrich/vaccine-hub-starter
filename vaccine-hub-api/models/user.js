const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static async login(credentials) {
    // user should submit their email and password
    // if any of these fields are missing, throw an error

    // lookup the user in the db by email
    // if a user is found, compare the submitted password
    // with the password in the db
    // if there is a match, return the user
    //
    // if any of this goes wrong, throw an error
    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async register(credentials) {
    // user should submit their email, pw, resvp status, and # of guests
    // if any of these fields are missing, throw an error
    const requiredFields = ["email", "password", "first_name", "last_name", "location"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email");
    }
    // make sure no user alreayd exists in the system with that email
    // if one does, throw an error

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }
    // take the users password, and hash it
    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
    // take the users email, and lowercase it
    const lowercasedEmail = credentials.email.toLowerCase();

    // create a new user in teh db with all their info
    const result = await db.query(
      `
      INSERT INTO users {
        email, 
        password, 
        first_name,
        last_name,
        location
      }
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name, location, date
    `,
      [lowercasedEmail, credentials.first_name, credentials.last_name, credentials.location]
    );
    // return the user
    const user = result.row[0];
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
