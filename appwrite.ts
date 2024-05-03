// appwrite.ts

import { Client, Databases, Account } from "appwrite";

const url: string = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project: string = import.meta.env.VITE_APPWRITE_PROJECT;
// const database_id: String = import.meta.env.VITE_DATABASE_ID;
// const collection_id: String = import.meta.env.VITE_COLLECTION_ID;

const client: Client = new Client();

client.setEndpoint(url).setProject(project);

// export const database_id;
// export const collection_id;
export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
