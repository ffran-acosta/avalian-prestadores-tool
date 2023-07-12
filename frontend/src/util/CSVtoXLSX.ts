import * as xlsx from 'xlsx';

export const convertToXLSX = (csvData: string) => {
    const workbook = xlsx.read(csvData, { type: 'string' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const newData: xlsx.CellObject[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as xlsx.CellObject[][];
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.aoa_to_sheet(newData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet 1');
    const xlsxData = xlsx.write(newWorkbook, { bookType: 'xlsx', type: 'buffer' });
    return xlsxData;
};
