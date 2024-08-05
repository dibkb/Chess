import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(9);

function getHash(unhash: string) {
  const hash = bcrypt.hashSync(unhash, salt);
  return hash;
}
interface ComparePassword {
  unhash: string;
  hash: string;
}
function comparePassword({ unhash, hash }: ComparePassword) {
  const res = bcrypt.compareSync(unhash, hash);
  return res;
}
export { getHash, comparePassword };
