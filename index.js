const fs = require('fs');
const parse = require('csv-parse').parse;
const stringify = require('csv-stringify').stringify;

const csvFilePath = 'input.csv';

const selectedColumns = [4, 6];

const newCsvFilePath = 'output.csv';

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Dosya okunurken bir hata oluştu:', err);
    return;
  }

  parse(data, { delimiter: ',' }, (parseErr, csvData) => {
    if (parseErr) {
      console.error('CSV parçalanırken bir hata oluştu:', parseErr);
      return;
    }

    const filteredData = csvData.map(row =>
      row.filter((_, index) => selectedColumns.includes(index))
    );

    stringify(filteredData, (stringifyErr, output) => {
      if (stringifyErr) {
        console.error('CSV dönüştürülürken bir hata oluştu:', stringifyErr);
        return;
      }

      fs.writeFile(newCsvFilePath, output, 'utf8', writeErr => {
        if (writeErr) {
          console.error('Dosya yazılırken bir hata oluştu:', writeErr);
          return;
        }
        console.log('Yeni CSV dosyası oluşturuldu:', newCsvFilePath);
      });
    });
  });
});
