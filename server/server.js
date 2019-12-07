import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Login from './models/login';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/meanapp');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successful!');
});

router.route('/logins').get((req, res) => {
    Login.find((err, logins) => {
        if (err)
            console.log(err);
        else
            res.json(logins);
    })
});
router.route('/logins/:id').get((req, res) => {
    Login.findById(req.params.id, (err, login) => {
        if (err)
            console.log(err);
        else
            res.json(login)
    })
});
router.route('/logins/add').post((req, res) => {
    let login = new Login(req.body);
    login.save()
        .then(login => {
            res.status(200).json({'login': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        })
});
router.route('/logins/update/:id').post((req, res) => {
    Login.findById(req.params.id, (err, login) => {
        if (!login)
            return next(new Error('Could not load document'));
        else {
            login.username = req.body.username;
            login.password = req.body.password;
            login.established = req.body.established;
            login.comments = req.body.comments;

            login.save().then(login => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
router.route('/logins/delete/:id').get((req, res) => {
    Login.findByIdAndRemove({_id: req.params.id}, (err, login) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});
app.use('/', router);

app.listen(4000, () => console.log('Express port 4000'));
