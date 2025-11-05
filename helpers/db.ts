import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    password: 'Test1234',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
  })

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database successfully');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

export async function queryDatabase(query: string) {
    const result = await client.query(query);
    console.log(result.rows);
    return result.rows;
}

export async function closeDatabaseConnection() {
    await client.end();
    console.log('Database connection closed successfully');
}

export async function createTableQuery() {
    await queryDatabase(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20),
        email VARCHAR(255) UNIQUE NOT NULL
    )`);
}

export async function insertUsersQuery() {
    await queryDatabase(`
        INSERT INTO users (name, surname, phone_number, email) VALUES
            ('Jan', 'Kowalski', '+48123456789', 'jan.kowalski@example.com'),
            ('Anna', 'Nowak', '+48234567890', 'anna.nowak@example.com'),
            ('Piotr', 'Wiśniewski', '+48345678901', 'piotr.wisniewski@example.com'),
            ('Maria', 'Wójcik', '+48456789012', 'maria.wojcik@example.com'),
            ('Krzysztof', 'Kamiński', '+48567890123', 'krzysztof.kaminski@example.com')
        ON CONFLICT (email) DO NOTHING
    `);
}

export async function selectAllUsersQuery() {
    return await queryDatabase(`SELECT * FROM users`);
}

export async function deleteAllUsersQuery() {
    return await queryDatabase(`DELETE FROM users`);
}