var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/girl', {
    useNewUrlParser: true
}).then(
    () => {
        console.log('connect success');
    },
    err => {
        console.log('connect error', err);
    }
);
