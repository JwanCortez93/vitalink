import { ID, Query } from "node-appwrite";
import { CreateUserParams } from "../../../types";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async ({ name, email, phone }: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );
    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [email])]);

      return documents?.users[0];
    }
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};
