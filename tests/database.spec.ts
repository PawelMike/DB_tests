import { test, expect } from '@playwright/test';
import { connectToDatabase, closeDatabaseConnection, createTableQuery, insertUsersQuery, selectAllUsersQuery, deleteAllUsersQuery } from '../helpers/db';

test('Database Connection Test', async () => {
    await test.step('Connect to the database', async () => {
        await connectToDatabase();
    });

    await test.step('Create table', async () => {
        await createTableQuery();
    });

    await test.step('Insert users', async () => {
        await insertUsersQuery();
        const result = await selectAllUsersQuery();
        await expect(result[0].name).toEqual('Jan');
    });

    await test.step('Delete users', async () => {
        await deleteAllUsersQuery();
        const emptyResult = await selectAllUsersQuery();
        await expect(emptyResult.length).toEqual(0);
    });

    await test.step('Close database connection', async () => {
        await closeDatabaseConnection();
    }); 
});