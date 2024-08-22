"use server";

import { ID, Query } from "node-appwrite";
import { CreateUserParams, RegisterUserParams } from "../../../types";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

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

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }

    const newPatient = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.PROJECT_ID}`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
