const path = require('path');
const fs = require('fs');

const accountsStoragePath = path.resolve(__dirname, 'storage/accounts.json');
const operationsStoragePath = path.resolve(__dirname, 'storage/operations.json');

try {
    fs.writeFileSync(accountsStoragePath, JSON.stringify([], null, 2), 'utf8');
    console.log('accounts.json created');
    fs.writeFileSync(operationsStoragePath, JSON.stringify([], null, 2), 'utf8');
    console.log('operations.json created');
} catch (e) {
    console.error(e)
}

