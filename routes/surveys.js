var express = require('express');
var passport = require('passport');
var router = express.Router();

var Survey = require('../models/survey');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* Render Survey main page. */
router.get('/', requireAuth, function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/index', {
                title: 'Surveys',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


router.post('/', requireAuth, function (req, res, next) {
       Survey.create({
        name: req.body.name,
        template: req.body.template,
        active: req.body.activeDate,
        expire: req.body.expireDate,
        noOfQuestions: req.body.noOfQuestions
        
    }, function (err, Survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('surveys/edit');
        }
    });
});

router.get('/edit', requireAuth, function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/edit', {
                title: 'Edit Survey',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});




module.exports = router;