import { test, expect } from '@playwright/test';
import { connectToDatabase, closeDatabaseConnection, createTableQuery, insertUsersQuery, selectAllUsersQuery } from '../helpers/db';

test('Database Connection Test', async () => {
    await connectToDatabase();
    await createTableQuery();
    await selectAllUsersQuery();
    await closeDatabaseConnection();
});