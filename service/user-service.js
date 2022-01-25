var fs = require('fs');
const { format } = require('@fast-csv/format');

async function validateUsers(users) {
    const validUsers = users.filter(x => x.name.length <= 50 && x.age >= 20 && x.age <= 80);
    const invalidUsers = users.filter(x => x.name.length > 50 || x.age < 20 || x.age > 80);
    createCsv(validUsers, 'dump/success.csv');
    createCsv(invalidUsers, 'dump/failed.csv');
    const responseObject = await createResponseObject(validUsers, invalidUsers);
    return { validUsers, responseObject }
}

async function validateUsersUsingRecursion(users){
    const validUsers = [];
    const invalidUsers = [];
    function validate(users){
        if (users.length == 0) {
            return;
        }
        let u = users[users.length - 1];
        if (u.name.length <= 50 && u.age >= 20 && u.age <= 80) {
            validUsers.push(users.pop());
            validate(users);
        }else{
            invalidUsers.push(users.pop());
            validate(users);
        }
    }
    validate(users);
    createCsv(validUsers, 'dump/success.csv');
    createCsv(invalidUsers, 'dump/failed.csv');
    const responseObject = await createResponseObject(validUsers, invalidUsers);
    return { validUsers, responseObject }
}

async function createCsv(users, fileName) {
    const file = fs.createWriteStream(fileName);
    const stream = format({ headers:true });
    stream.pipe(file);
    for (let i = 0; i < users.length; i++) {
        stream.write(users[i]);
    }
    stream.end();
}

async function createResponseObject(validUsers, invalidUsers) {
    let response = {
        "success": {
            "count": validUsers.length,
            "data": validUsers
        },
        "failed": {
            "count": invalidUsers.length,
            "data": invalidUsers
        }
    }
    return response;
}

module.exports = { validateUsers, validateUsersUsingRecursion }