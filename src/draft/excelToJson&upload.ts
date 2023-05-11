import * as XLSX from 'xlsx';
import * as xlsxToJson from 'xlsx-to-json';
import { Pool } from 'pg';

const convertExcelToJson = (filePath: string) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    return jsonData;
};

const uploadDataToDb = async (jsonData: any[][]) => {
    const pool = new Pool({
        user: 'your_database_user',
        host: 'your_database_host',
        database: 'your_database_name',
        password: 'your_database_password',
        port: 5432, // Replace with your database port
    });

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Assuming you have a table named "data" with columns "column1", "column2", etc.
        for (const row of jsonData) {
            const query = {
                text: 'INSERT INTO data (column1, column2, ...) VALUES ($1, $2, ...)',
                values: row, // Make sure the order matches the column order in the table
            };

            await client.query(query);
        }

        await client.query('COMMIT');
        console.log('Data uploaded successfully!');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error uploading data:', error);
    } finally {
        client.release();
    }
};

const filePath = 'path/to/your/excel/file.xlsx';
const jsonData = convertExcelToJson(filePath);
uploadDataToDb(jsonData);