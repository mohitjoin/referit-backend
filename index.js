const express = require('express')
const port = 7000;
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is up and running server of Nodejs for refer-it app')
})

app.listen(process.env.PORT || port, (err) => {
    if (err)
        console.log('There is an error inn running');

    console.log(`server is running at ${port}`);
})
var mysql = require('mysql');
var db = mysql.createPool({
    connectionLimit: 20,
    // host: 'localhost',
    // user: 'mknode',
    // password: 'passwordnode',
    // database: 'phpv'

    host: 'sql6.freesqldatabase.com',
    user: 'sql6458091',
    password: 'Je5P9gd2hw',
    database: 'sql6458091'
});

app.get('/api/getAllRefferal', (req, res) => {


        const query1 = "Select * from referrals ORDER BY referid DESC";
        db.query(query1, (err, result) => {

            res.send(result);
        })
    })
    // db.connect(function(err) {
    //     if (err) {
    //         console.error('error connecting: ' + err.stack);
    //         return;
    //     }

//     console.log('connected as id ' + db.threadId);
// });

app.get('/api/getSearchedRefferal/:coname', (req, res) => {

    const coname = req.params.coname;
    const query2 = "Select * from referrals where cname like ?";
    db.query(query2, ['%' + coname + '%'], (err, result) => {

        res.send(result);
    })
})

app.post('/api/insertReferal', (req, result) => {


    const coname = req.body.coname;
    const cologolink = req.body.cologolink;
    const corolerefer = req.body.corolerefer;
    const coskillsn = req.body.coskillsn;
    const coyname = req.body.coyname;
    const coyemail = req.body.coyemail;
    const coldate = req.body.coldate;
    const cojdlink = req.body.cojdlink;



    const query3 = "insert into referrals(cname,clink,crole,cskills,mname,cemail,cjdlink,ldate) value (?,?,?,?,?,?,?,?)"

    db.query(query3, [coname, cologolink, corolerefer, coskillsn, coyname, coyemail, cojdlink, coldate], (err, result) => {

            // console.log(result);
        })
        // res.send('Here is server')

})
