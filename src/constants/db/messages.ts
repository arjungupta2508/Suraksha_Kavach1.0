import { execSqlAsync } from './index';

export interface MessagePayload {
  source: string;
  text: string;
  sender?: string | null;
  attachment_path?: string | null;
  language?: string | null;
  ocr_confidence?: number | null;
  
  // Scam detection fields
  is_scam?: boolean;
  scam_confidence?: number;
  scam_category?: string;
  scam_flags?: string[];
}

// Insert new message
export async function insertMessage(payload: MessagePayload): Promise<number> {
  const now = Date.now();
  const sql = `
    INSERT INTO messages
    (source, sender, text, language, ocr_confidence, attachment_path, 
     is_scam, scam_confidence, scam_category, scam_flags, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    payload.source,
    payload.sender ?? null,
    payload.text,
    payload.language ?? null,
    payload.ocr_confidence ?? null,
    payload.attachment_path ?? null,
    payload.is_scam ? 1 : 0,
    payload.scam_confidence ?? 0,
    payload.scam_category ?? null,
    payload.scam_flags ? JSON.stringify(payload.scam_flags) : null,
    now,
    now
  ];

  const res = await execSqlAsync(sql, params);
  return res?.insertId || -1;
}

// Fetch all messages
export async function fetchMessages(limit = 50, offset = 0) {
  const res = await execSqlAsync(
    'SELECT * FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?;',
    [limit, offset]
  );
  const rows: any[] = [];
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    if (row.scam_flags) {
      try {
        row.scam_flags = JSON.parse(row.scam_flags);
      } catch {
        row.scam_flags = [];
      }
    }
    rows.push(row);
  }
  return rows;
}

// Fetch only scam messages
export async function fetchScamMessages(limit = 50, offset = 0) {
  const res = await execSqlAsync(
    'SELECT * FROM messages WHERE is_scam = 1 ORDER BY scam_confidence DESC, created_at DESC LIMIT ? OFFSET ?;',
    [limit, offset]
  );
  const rows: any[] = [];
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    if (row.scam_flags) {
      try {
        row.scam_flags = JSON.parse(row.scam_flags);
      } catch {
        row.scam_flags = [];
      }
    }
    rows.push(row);
  }
  return rows;
}

// Get scam statistics
export async function getScamStats() {
  const totalRes = await execSqlAsync('SELECT COUNT(*) as total FROM messages');
  const scamRes = await execSqlAsync('SELECT COUNT(*) as scams FROM messages WHERE is_scam = 1');
  const avgConfidenceRes = await execSqlAsync(
    'SELECT AVG(scam_confidence) as avg_confidence FROM messages WHERE is_scam = 1'
  );
  
  return {
    total: totalRes.rows.item(0).total,
    scams: scamRes.rows.item(0).scams,
    avgConfidence: avgConfidenceRes.rows.item(0).avg_confidence || 0,
    safeMessages: totalRes.rows.item(0).total - scamRes.rows.item(0).scams
  };
}

// Search messages by text
export async function searchMessages(searchTerm: string) {
  const res = await execSqlAsync(
    'SELECT * FROM messages WHERE text LIKE ? ORDER BY created_at DESC LIMIT 50;',
    [`%${searchTerm}%`]
  );
  const rows: any[] = [];
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    if (row.scam_flags) {
      try {
        row.scam_flags = JSON.parse(row.scam_flags);
      } catch {
        row.scam_flags = [];
      }
    }
    rows.push(row);
  }
  return rows;
}

// Delete a message
export async function deleteMessage(id: number): Promise<boolean> {
  try {
    await execSqlAsync('DELETE FROM messages WHERE id = ?;', [id]);
    return true;
  } catch {
    return false;
  }
}