import mysql2 from "mysql2/promise";

const conexao = mysql2.createPool({
    host: 'localhost',
    user:'root',
    password:'Senha123',
    database:'helpdex',
});