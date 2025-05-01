const bcrypt = require("bcryptjs");

const password = "fuzail1206";

async function hashPassword() {
  const newPass = await bcrypt.hash(password, 10);
  console.log(newPass);
}

hashPassword();
