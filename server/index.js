
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { movieInfoController } = require('./movieInfoController');

app.use('/main/:id', express.static('client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/info/:id', movieInfoController);
app.post('/info/:id/create', movieInfoController);
app.put('/info/:id/put', movieInfoController);
app.delete('/info/:id/delete', movieInfoController);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/*
REDUNDANT API CALL. ABSOLUTELY NOT NECESSARY.
EVEN WITHIN THE ORIGINAL REPO FROM FANDANGIT, THE API CALL MADE FOR MOVIE INFO INCLUDED THE URL LINK TO THE MOVIE POSTER AND THIS INFORMATION IS PASSED DOWN TO CHILD COMPONENTS.
NO IDEA WHY THIS WAS INCLUDED WITHIN AS A SEPERATE API CALL.

route for getting movie poster
app.get('/info/:id/poster', (req, res) => {
  const movieId = req.params.id;
  db.getMoviePoster(movieId, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results[0].info.image);
    }
  });
});
*/
