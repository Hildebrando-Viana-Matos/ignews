import { Client } from "faunadb";
// Accessing FaunaDB
export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
})