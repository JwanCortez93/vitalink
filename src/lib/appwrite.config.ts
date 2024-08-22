import dotenv from "dotenv";
import * as sdk from "node-appwrite";

dotenv.config({ path: ".env.local" });

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66add49f000ae222f7e4")
  .setKey(
    "04c14ce7150a8f491604c4871d36666f857f086d4c422a6ec9c481786220f0cebefdc30f58219bac47b89b1d47519f491581fbfcea2def493fc123fe3979dfbb38e7cd3788dcb9cd89a46cfbf295da18005135cbb3019fbf1f0678e9134f160301d11db9e8c56bdf74920db74507cd371c06a78430d179d75e32264b491dfd9e"
  );

//! I HAVE TO USE ENVIRONMENTS, FIX!

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
