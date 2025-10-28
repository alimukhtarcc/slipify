import * as xlsx from 'xlsx';
import  Papa from 'papaparse';

class ExelToJson
{
    constructor(file)
    {
        this.file = file;

    }
    async parseFile()
    {
        const extension = '.' + this.file.name.split('.').pop().toLowerCase();
        if (extension === '.xlsx' || extension === '.xls')
             {
            return this.parsexlsx();
        } 
}
     async parsexlsx()
    {
        const buffer = await this.file.arrayBuffer();
        const workbook = xlsx.read(buffer, { type: 'array' });
        const Sheets = workbook.Sheets[workbook];
        const jsonData = xlsx.utils.sheet_to_json(Sheets, { defval: '' });
        console.log(jsonData);
        return jsonData;
    }

}
