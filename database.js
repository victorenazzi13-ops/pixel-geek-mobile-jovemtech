import * as SQLite from 'expo-sqlite';

// Mudamos o nome para resetar o banco local no Expo Go e aplicar a nova estrutura
const db = SQLite.openDatabaseSync('mydb_v2.db');

export function initDatabase() {
    try {
        db.execSync(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            telefone TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS curriculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            arquivo TEXT NOT NULL
        );
        `);

        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
}

export function getDatabase() {
    return db;
}