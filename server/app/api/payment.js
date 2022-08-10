const SSLCommerzPayment = require("sslcommerz-lts");
const bodyParser = require('body-parser')
const con = require("../models/db");
require('dotenv').config()
console.log(process.env.STORE_ID);
console.log(process.env.STORE_PASSWORD);
module.exports = (app) => {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json());


    app.get('/api/ssl-request', async (req, res) => {

        /** 
        * Create ssl session request 
        */

        const data = {
            total_amount: req.query.amount,
            currency: 'BDT',
            tran_id: 'REF123',
            success_url: `${process.env.ROOT}/ssl-payment-success?invoice=${req.query.invoice}&&redirect=${req.query.redirect}`,
            fail_url: `${process.env.ROOT}/ssl-payment-fail`,
            cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
            shipping_method: 'No',
            product_name: req.query.product,
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'cust@yahoo.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01',
            cus_fax: '',
            value_a: 'ref001_A',
            value_b: 'ref002_B',
            value_c: 'ref003_C',
            value_d: 'ref004_D',
            ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
        };

        const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, true) //true for live default false for sandbox
        sslcommerz.init(data).then(data => {
            console.log(data)

            //process the response that got from sslcommerz 
            //https://developer.sslcommerz.com/doc/v4/#returned-parameters

            if (data.GatewayPageURL) {
                return res.status(200).redirect(data.GatewayPageURL);
            }
            else {
                return res.status(400).json({
                    message: "Session was not successful"
                });
            }
        });

    });

    app.post("/ssl-payment-notification", async (req, res) => {

        /** 
        * If payment notification
        */

        return res.status(200).json(
            {
                data: req.body,
                message: 'Payment notification'
            }
        );
    })

    app.post("/ssl-payment-success", async (req, res) => {

        /** 
        * If payment successful 
        */
        console.log(req, res);
        con.query(`select * from payment where invoice_no=${req.query.invoice}`, function (err, result, fields) {
            if (err) throw err;
            if (result.length === 0) {
                con.query(`select sector.* from payment_invoice left join sector on sector.id = payment_invoice.sector_id where invoice_no=${req.query.invoice}`, function (err, result, fields) {
                    const data = result[0]
                    var sql = `INSERT INTO payment (sector_id, student_id, invoice_no, transaction_id, paid_date) VALUES ("${data.id}", "${data.student_id}", "${req.query.invoice}", "${transaction_id}", "${moment().format('YYYY-MM-DD')}")`;

                    con.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        return res.status(200).redirect(`${process.env.FRONT_ROOT}/${req.query.redirect}`)
                    });
                });
            } else {
            }
        });
       
    })

    app.post("/ssl-payment-fail", async (req, res) => {

        /** 
        * If payment failed 
        */

        return res.status(200).json(
            {
                data: req.body,
                message: 'Payment failed'
            }
        );
    })

    app.post("/ssl-payment-cancel", async (req, res) => {

        /** 
        * If payment cancelled 
        */

        return res.status(200).json(
            {
                data: req.body,
                message: 'Payment cancelled'
            }
        );
    })

}
