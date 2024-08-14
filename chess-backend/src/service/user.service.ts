import { prisma } from "..";

const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
};

const getUserByUserId = (userid: string) => {
  const user = prisma.user.findUnique({
    where: { id: userid },
    select: {
      username: true,
      profilePic: true,
      id: true,
    },
  });
  return user;
};

export { getUserByUsername, getUserByUserId };
