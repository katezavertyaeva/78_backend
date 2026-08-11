import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

export const db: NodePgDatabase = drizzle(process.env.DATABASE_URL!);