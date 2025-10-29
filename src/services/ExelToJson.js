import * as xlsx from 'xlsx';
import Papa from 'papaparse';

/**
 * Converts an uploaded Excel/CSV file into an array of normalized JSON
 * objects ready to send to the backend.
 *
 * Expected output per row:
 * {
 *   employeeId: string,
 *   employeeName: string,
 *   designation: string,
 *   accountNumber: string,
 *   salary: number
 * }
 */
class ExelToJson {
    constructor(file) {
        this.file = file;
    }

    async parseFile() {
        const extension = '.' + this.file.name.split('.').pop().toLowerCase();
        if (extension === '.xlsx' || extension === '.xls') {
            return this.parseXlsx();
        }
        if (extension === '.csv') {
            return this.parseCsv();
        }
        throw new Error('Unsupported file type');
    }

    /**
     * Parse .xlsx/.xls into JSON then normalize headers and values
     */
    async parseXlsx() {
        const buffer = await this.file.arrayBuffer();
        const workbook = xlsx.read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
        return this.normalizeRows(rows);
    }

    /**
     * Parse .csv into JSON rows then normalize
     */
    async parseCsv() {
        const text = await this.file.text();
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        if (result.errors && result.errors.length) {
            const firstError = result.errors[0];
            throw new Error(firstError.message || 'Failed to parse CSV file');
        }
        return this.normalizeRows(result.data);
    }

    /**
     * Normalize arbitrary header keys to the expected backend keys
     */
    normalizeRows(rows) {
        const keyMap = {
            employeeid: 'employeeId',
            empid: 'employeeId',
            id: 'employeeId',
            employee_id: 'employeeId',

            employeename: 'Name',
            name: 'Name',
            employee_name: 'Name',

            designation: 'designation',
            role: 'designation',
            jobtitle: 'designation',
            job_title: 'designation',
            
            emailId: 'emailId',
            emailid: 'emailId',
            
            accountnumber: 'accountNumber',
            account_no: 'accountNumber',
            account_no_: 'accountNumber',
            iban: 'accountNumber',

            salary: 'salary',
            basepay: 'salary',
            grosssalary: 'salary'
        };

        const normalizeKey = (key) => key.replace(/[^a-z0-9]/gi, '').toLowerCase();

        const normalized = rows
            .filter((r) => r && Object.keys(r).length > 0)
            .map((row) => {
                const record = {
                    employeeId: '',
                    Name: '',
                    designation: '',
                    accountNumber: '',
                    salary: 0,
                    emailId: ''
                };

                for (const rawKey of Object.keys(row)) {
                    const value = row[rawKey];
                    const nk = normalizeKey(rawKey);
                    const mapped = keyMap[nk];
                    if (mapped) {
                        if (mapped === 'salary') {
                            const num = typeof value === 'number' ? value : Number(String(value).replace(/[,\s]/g, ''));
                            record.salary = Number.isFinite(num) ? num : 0;
                        } else {
                            record[mapped] = value?.toString?.() ?? '';
                        }
                    }
                }
                return record;
            })
            .filter((r) => r.employeeId || r.Name || r.accountNumber || r.emailId );
            
        console.log(normalized)
        return normalized;
    }
}

export default ExelToJson;
