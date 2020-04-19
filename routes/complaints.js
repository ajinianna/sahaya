var express = require('express');
var router = express.Router();

var connection = require('../common/db')

router.get('/', function (req, res, next) {
    var selectQuery = ""
    if (req.session.userType == 'offficial_user') {
        selectQuery = {
            text: 'SELECT *	FROM public.complaints;',
            values: []
        };
    } else {
        selectQuery = {
            text: 'SELECT *	FROM public.complaints WHERE complaint_owner=$1;',
            values: [req.session.email]
        };
    }
    connection.query(selectQuery)
        .then(result => res.render('complaints/dashboard',
            { title: 'Dashboard', rows: result.rows }))
        .catch(next);
});

['accident', 'murder', 'missing', 'cyber', 'other'].forEach(complaintType =>
    addComplaintRoute(complaintType, complaintType));

function addComplaintRoute(complaintType, header) {
    router.get('/' + complaintType, (req, res, next) => {
        res.render('complaints/' + complaintType, { title: header });
    }).post('/' + complaintType, (req, res, next) => {
        insertComplaint(req, res, next, complaintType);
    }).get('/' + complaintType + '/:complaintId', (req, res, next) => {
        getComplaint(req, res, next, complaintType, header);
    });
}


function getComplaint(req, res, next, complaintType, title) {
    const selectQuery = {
        text: 'SELECT *	FROM public.complaints WHERE id=$1;',
        values: [req.params.complaintId]
    };
    connection.query(selectQuery)
        .then(result => res.render('complaints/' + complaintType, { title: title, form: result.rows[0].complaint_data, disableAll: true }))
        .catch(next);
}

function insertComplaint(req, res, next, complaintType) {
    var today = new Date();

    var strDate = 'Y-m-d'
        .replace('Y', today.getFullYear())
        .replace('m', today.getMonth() + 1)
        .replace('d', today.getDate());
    const insertQuery = {
        text: 'INSERT INTO public.complaints(complaint_owner, complaint_data, complaint_type, date) VALUES ($1, $2, $3, $4);',
        values: [req.session.email, req.body, complaintType, strDate]
    };
    connection.query(insertQuery)
        .then(result => res.redirect('/complaints'))
        .catch(next);
}

module.exports = router; 