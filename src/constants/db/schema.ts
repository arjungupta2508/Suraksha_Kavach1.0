export const MESSAGES_TABLE = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT,
  sender TEXT,
  text TEXT,
  language TEXT,
  ocr_confidence REAL,
  attachment_path TEXT,
  
  -- Scam detection fields
  is_scam INTEGER DEFAULT 0,
  scam_confidence REAL DEFAULT 0,
  scam_category TEXT,
  scam_flags TEXT,
  
  created_at INTEGER,
  updated_at INTEGER
);
`;

export const SCAM_INDEX = `
CREATE INDEX IF NOT EXISTS idx_messages_scam 
ON messages(is_scam, scam_confidence);
`;