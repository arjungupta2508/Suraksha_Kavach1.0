import * as SQLite from 'expo-sqlite';
import { MESSAGES_TABLE, SCAM_INDEX } from './schema';

const DB_NAME = 'suraksha_kavach.db';
const db: any = SQLite.openDatabaseSync(DB_NAME);

// Execute any SQL asynchronously
export async function execSqlAsync(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx: any) => {
        tx.executeSql(
          sql,
          params,
          (_tx: any, result: any) => resolve(result),
          (_tx: any, error: any) => {
            console.error("SQL Error:", error);
            reject(error);
            return false;
          }
        );
      });
    } catch (err) {
      console.error("Transaction Error:", err);
      reject(err);
    }
  });
}

// Initialize database
export async function initializeDB() {
  await execSqlAsync(MESSAGES_TABLE);
  await execSqlAsync(SCAM_INDEX);
}

export default db;
