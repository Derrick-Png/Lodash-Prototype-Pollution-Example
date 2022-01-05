const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const e = require('express');
const app = express();


const users = [
  // You know password for the user.
  {name: 'user', password: 'pwd'},
];

let default_messages = [
  {
    message: "NYP{PR0T0TYPE_P011UTI0N_15_TH3_K3Y}",
    secret: true,
  },
  {
    message: "uggcf://ovg.yl/3cepWv1 do not worry, this is not another bingchiling remix", 
    secret: true,
  },
  {
    message: "I have a roblox account"
  },
  {
    message: "I own a NFT :kek:"
  },
  {
    message: "What a nerd"
  },
  {
    message: "Metaverse"
  }
];

let messages = default_messages
let lastId = 1;


function findUser(auth) {
  return users.find((u) =>
    u.name === auth.name &&
    u.password === auth.password);
}
///////////////////////////////////////////////////////////////////////////////

app.use(cors())
app.use(bodyParser.json());

// Get all messages (publicly available).
app.get('/api/message', (req, res) => {
  var user = null;
  if(req.query.name != "null" && req.query.password != "null")
  {
    var auth = {name: req.query.name, password: req.query.password}
    user = findUser(auth)
  }
  if(user)
  {
    if(user.secret)
    {
      res.send(messages);  
    }
    else
    {
      res.send(messages.filter(message => message.secret != true));
    }
  }
  else
  {
    res.status(401).send({"error": 'Access denied'})
    return;
  }
});

// Post message (restricted for users only).
app.put('/api/message', (req, res) => {
  const user = findUser(req.body.auth)
  if (!user) {
    res.status(403).send({ok: false, error: 'Access denied'});
    return;
  }

  const message = {
    // Default message icon. Cen be overwritten by user.
    icon: '👋',
  };

  _.merge(message, req.body.message, {
    id: lastId++,
    timestamp: Date.now(),
    userName: user.name,
  });

  messages.push(message);
  res.send({ok: true});
});

app.get("/api/reset", (req, res)=>{
  messages = default_messages
})

app.post("/api/login", (req, res)=>{
  if(findUser(req.body.auth))
  {
    res.send({ok:true})
  }
  else
  {
    res.send({ok:false})
  }
})

app.listen(6969, 'localhost');
console.log('Listening on port 3000...');
