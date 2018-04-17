// Express Setup //
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup //
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

app.get('/api/cards/:id', (req,res) => {
  // id of the person we are interested in
  let id = parseInt(req.params.id);
  // offset into the results
  let offset = 0;
  if (req.query.offset)
    offset = parseInt(req.query.offset);
  // number of results we should return
  let limit = 50;
  if (req.query.limit)
    limit = parseInt(req.query.limit);
  // get people this person is following
  knex('cards').where('cards.user_id', id).then(cards => {
    return cards
  }).then(cards => {
    res.status(200).json({cards:cards});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});


app.get('/api/cards', (req, res) => {
  res.send(cards);
});

app.post('/api/cards/:id', (req,res) => {
  // id of the person we are interested in
  let user_id = parseInt(req.params.id);
  let word = req.body.card.word;
  let definition = req.body.card.definition;
  // get people this person is following
  knex('cards').insert({user_id:user_id, word: word, definition: definition}).then(cards => {
    return cards
  }).then(cards => {
    res.status(200).json({cards:cards});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.post('/api/cards', (req, res) => {
  cards.push(req.body.card);
  res.send(req.body.cards);
});

app.delete('/api/cards/:id', (req, res) => {
  let card_id = req.params.id;
  // console.log(req.params);
  knex('cards').where({'id': card_id}).del().then(cards => {
    res.status(200).json({cards:cards});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});


app.put('/api/cards/:id', (req, res) => {
  let card_id = parseInt(req.body.card.id);
  let word = req.body.card.word;
  let definition = req.body.card.definition;

  knex('cards').where({'id': card_id}).update({'word': word, 'definition': definition}).then(cards => {
    return cards
  }).then(cards => {
    res.status(200).json({cards:cards});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

// Login //

app.post('/api/login', (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send();
  knex('users').where('name',req.body.name).first().then(user => {
    // console.log(user);
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [(req.body.password === user.password), user];

  }).spread((result,user) => {
    if (result) {
      res.status(200).json({user:{name:user.name,id:user.id}});
    } else {
      res.status(403).send("Invalid credentials");
    }
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// Registration //

app.post('/api/users', (req, res) => {
  if (!req.body.password || !req.body.name)
    return res.status(400).send();
  knex('users').where('name',req.body.name).first().then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return req.body.password;
  }).then(password => {
    return knex('users').insert({password: password,
      name:req.body.name});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('name','id');
  }).then(user => {
    let token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: '24h' // expires in 24 hours
    });
    res.status(200).json({user:user,token:token});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// Users //

// Get my account
app.get('/api/me', (req,res) => {
  knex('users').where('id',req.userID).first().select('name','id').then(user => {
    res.status(200).json({user:user});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.get('/api/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  // get user record
  knex('users').where('id',id).first().select('name','id').then(user => {
    res.status(200).json({user:user});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

// User Tweets //

app.get('/api/users/:id/tweets', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('tweets','users.id','tweets.user_id')
    .where('users.id',id)
    .orderBy('created','desc')
    .select('tweet','username','name','created').then(tweets => {
    res.status(200).json({tweets:tweets});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});


app.listen(3030, () => console.log('Server listening on port 3030!'));
