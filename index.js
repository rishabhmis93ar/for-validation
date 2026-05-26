const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');


// Mddleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

validationRegistration = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min:3 })
        .withMessage('Username must be atleast 3 characters long')
        .trim()
        .isAlpha()
        .withMessage('Username must contain only letters'),

    body('useremail')
        .isEmail()
        .withMessage("Please enter a valid Email Id")
        .normalizeEmail(),

    body('userpass')
        .isLength({ min:5, max:10 })
        .withMessage('Password must be between 5 and 10 characters long')
        .isStrongPassword()
        .withMessage("Password must be strong"),

    body('userage')
        .isNumeric()
        .withMessage('Age must be numeric'),

    body('usercity')
        .isIn(['Delhi', 'Mumbai', 'Banglore', 'Pune'])
        .withMessage('City must be Delhi, Mumbai, Banglore or Pune'),

]

app.get('/myform', (req, res) => {
    res.render('myform', { errors: [] });
});

app.post('/saveform', validationRegistration, (req, res) => {
    const error = validationResult(req);

    if(error.isEmpty()) {
        res.send(req.body);
    }
    res.render('myform', { errors: error.array() });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})