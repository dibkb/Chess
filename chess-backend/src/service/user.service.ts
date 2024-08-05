import { prisma } from "..";

const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
};
export { getUserByUsername };
