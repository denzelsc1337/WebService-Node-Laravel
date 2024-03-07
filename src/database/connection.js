import sql from 'mssql';


const dbsettings = {
    user:'sa_admin',
    password:'643$$kqAS543',
    server:'kunaqcontrolador.cgjpxdkt8txc.sa-east-1.rds.amazonaws.com',
    database:'KQ-PortalClientes',
    port: 3725,
    options:{
        trustedconnection:false,
        enableArithAbort:true,
        encrypt:false,
        trustServerCertificate: false
    }
}

/*
const dbsettings = {
    user:'sa',
    password:'123456',
    server:'DESKTOP-RJAPN8C\\SQLEXPRESS',
    database:'db_node',
    // port: 3725,
    options:{
        trustedconnection:false,
        enableArithAbort:true,
        encrypt:false,
        trustServerCertificate: false
    }
}
*/


export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbsettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export { sql };