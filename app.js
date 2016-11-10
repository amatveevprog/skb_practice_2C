import express from 'express';
import cors from 'cors';

import UrlParser from './index';

const app = express();

app.use(cors());

app.get('/parseusername', async (req, res, next) => {
  let result='';
  if(req.query.username!='') {
    const url_parser = new UrlParser(req.query.username);
    result = await url_parser.parse();
  }
  else
  {
    result='Invalid fullname';
  }
  res.send(result);
  res.end();
  return next();
});

app.listen(2000,()=>{console.log('Server Started. Listening on port 2000...')});
