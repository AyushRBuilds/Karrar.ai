import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Initialize database path
const dbDir = process.env.DB_PATH || path.join(process.cwd(), 'data')
const dbPath = path.join(dbDir, 'contracts.db')

// Ensure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Create database connection
let db: Database.Database | null = null

function getDB(): Database.Database {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    initializeSchema()
  }
  return db
}

function initializeSchema() {
  const database = getDB()

  // Users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      tier TEXT DEFAULT 'free',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      analysisCount INTEGER DEFAULT 0,
      lastAnalysisDate DATETIME
    )
  `)

  // Contracts table
  database.exec(`
    CREATE TABLE IF NOT EXISTS contracts (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      filename TEXT NOT NULL,
      filePath TEXT NOT NULL,
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'processing',
      fileSize INTEGER,
      pageCount INTEGER,
      rawText TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `)

  // Clauses table
  database.exec(`
    CREATE TABLE IF NOT EXISTS clauses (
      id TEXT PRIMARY KEY,
      contractId TEXT NOT NULL,
      clauseText TEXT NOT NULL,
      clauseType TEXT,
      position INTEGER,
      parsedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT,
      FOREIGN KEY (contractId) REFERENCES contracts(id)
    )
  `)

  // Analysis results table
  database.exec(`
    CREATE TABLE IF NOT EXISTS analysis_results (
      id TEXT PRIMARY KEY,
      contractId TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'processing',
      riskScore REAL,
      riskLevel TEXT,
      riskDetails TEXT,
      regulatoryAdaptation TEXT,
      completeness TEXT,
      explanation TEXT,
      negotiation TEXT,
      consistency TEXT,
      synthesis TEXT,
      FOREIGN KEY (contractId) REFERENCES contracts(id)
    )
  `)

  // Create indexes for performance
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_contracts_userId ON contracts(userId);
    CREATE INDEX IF NOT EXISTS idx_clauses_contractId ON clauses(contractId);
    CREATE INDEX IF NOT EXISTS idx_analysis_contractId ON analysis_results(contractId);
  `)
}

// Helper functions for database operations

export function createContract(
  userId: string,
  filename: string,
  filePath: string,
  fileSize: number
): string {
  const database = getDB()
  const contractId = `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const stmt = database.prepare(`
    INSERT INTO contracts (id, userId, filename, filePath, fileSize, status)
    VALUES (?, ?, ?, ?, ?, 'processing')
  `)

  stmt.run(contractId, userId, filename, filePath, fileSize)
  return contractId
}

export function updateContractStatus(
  contractId: string,
  status: 'processing' | 'completed' | 'failed',
  rawText?: string,
  pageCount?: number
): void {
  const database = getDB()
  const stmt = database.prepare(`
    UPDATE contracts
    SET status = ?, rawText = ?, pageCount = ?
    WHERE id = ?
  `)
  stmt.run(status, rawText || null, pageCount || null, contractId)
}

export function addClause(
  contractId: string,
  clauseText: string,
  clauseType: string,
  position: number,
  metadata?: Record<string, any>
): string {
  const database = getDB()
  const clauseId = `clause_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const stmt = database.prepare(`
    INSERT INTO clauses (id, contractId, clauseText, clauseType, position, metadata)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  stmt.run(
    clauseId,
    contractId,
    clauseText,
    clauseType,
    position,
    metadata ? JSON.stringify(metadata) : null
  )

  return clauseId
}

export function getClauses(contractId: string) {
  const database = getDB()
  const stmt = database.prepare(`
    SELECT * FROM clauses WHERE contractId = ? ORDER BY position
  `)
  const rows = stmt.all(contractId) as any[]
  return rows.map(row => ({
    ...row,
    metadata: row.metadata ? JSON.parse(row.metadata) : null
  }))
}

export function getContract(contractId: string) {
  const database = getDB()
  const stmt = database.prepare('SELECT * FROM contracts WHERE id = ?')
  return stmt.get(contractId)
}

export function createAnalysisResult(contractId: string): string {
  const database = getDB()
  const resultId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const stmt = database.prepare(`
    INSERT INTO analysis_results (id, contractId, status)
    VALUES (?, ?, 'processing')
  `)

  stmt.run(resultId, contractId)
  return resultId
}

export function updateAnalysisResult(
  resultId: string,
  analysisData: Record<string, any>,
  status: 'processing' | 'completed' | 'failed' = 'completed'
): void {
  const database = getDB()

  const setClause = Object.keys(analysisData)
    .map(key => `${key} = ?`)
    .join(', ')

  const values = [...Object.values(analysisData), status, resultId]

  const stmt = database.prepare(`
    UPDATE analysis_results
    SET ${setClause}, status = ?
    WHERE id = ?
  `)

  stmt.run(...values)
}

export function getAnalysisResult(resultId: string) {
  const database = getDB()
  const stmt = database.prepare('SELECT * FROM analysis_results WHERE id = ?')
  const row = stmt.get(resultId) as any

  if (!row) return null

  // Parse JSON fields
  const result = { ...row }
  const jsonFields = [
    'riskDetails',
    'regulatoryAdaptation',
    'completeness',
    'explanation',
    'negotiation',
    'consistency',
    'synthesis'
  ]

  jsonFields.forEach(field => {
    if (result[field]) {
      try {
        result[field] = JSON.parse(result[field])
      } catch (e) {
        // Ignore parse errors
      }
    }
  })

  return result
}

export function getContractAnalysis(contractId: string) {
  const database = getDB()
  const stmt = database.prepare('SELECT * FROM analysis_results WHERE contractId = ? LIMIT 1')
  return stmt.get(contractId)
}

export function getUserContracts(userId: string) {
  const database = getDB()
  const stmt = database.prepare(`
    SELECT * FROM contracts WHERE userId = ? ORDER BY uploadDate DESC
  `)
  return stmt.all(userId)
}

export function closeDB(): void {
  if (db) {
    db.close()
    db = null
  }
}

export { getDB }
