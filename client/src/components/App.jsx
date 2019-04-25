import React from 'react';
import { MovieInfo } from './MovieInfo.jsx';
import { MoviePoster } from './MoviePoster.jsx';
import Options from './Options.jsx';
import LocationSearch from './LocationSearch.jsx';
import LocationShowTimes from './LocationShowtimes.jsx';
import MovieNavbar from './MovieNavbar.jsx';
import API_KEY from '../../key';

// styled components below
const PosterWrapper = window.styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;
const ContentWrapper = window.styled.div`
  margin: 0 0 0 8vw;
  width: 400px;
`;

// React component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: '',
      movieInfo: null,
      locationSearched: false,
      showtimeInfo: null,
    };
  }

  // fetch movie poster and info on mount
  componentDidMount() {
    // this.getMoviePoster(this.state.movieId);
    this.getMovieInfo(this.state.movieId);
  }

  // get poster image associated with selected movie
  getMoviePoster() {
    // grabs pathname i.e.) /1/ and then parses it to number 1
    const idRoute = window.location.pathname;
    const idArray = idRoute.split('/').filter(elem => elem !== '');
    const parsedId = Number(idArray[idArray.length - 1]);
    console.log('parsedId for movie poster', parsedId);
    // CHANGED ENDPOINT
    fetch(`/info/${parsedId || 1}/poster`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          poster: result,
        });
      },
      (error) => {
        this.setState({ error });
      });
  }

  // get correct movie info
  getMovieInfo(id) {
    // const idRoute = window.location.pathname;
    // const parsedId = Number(idRoute.split('').filter(char => char !== '/').join(''));

    const idRoute = window.location.pathname;
    const idArray = idRoute.split('/').filter(elem => elem !== '');
    const parsedId = Number(idArray[idArray.length - 1]);
    console.log('parsedId for movie info', parsedId);
    // currently doing localhost:2000/3 etc will not display properly
    // CHANGED ENDPOINT
    fetch(`/info/${parsedId || 1}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          const modifiedResult = {
            info: {
              name: result.name,
              genre: result.genre,
              score: result.score,
              runtime: result.runtime,
              image: result.image,
              rating: result.rating,
              releaseMonth: result.releasemonth,
              releaseDay: result.relseaseday,
              releaseYear: result.releaseyear,
            },
          };
          this.setState({
            movieInfo: modifiedResult,
            poster: result.image,
          });
        },
        (error) => {
          this.setState({ error });
        },
      );
  }

  // change state if search go button is clicked and then get location of user
  changeLocationSearchStatus() {
    this.setState({
      locationSearched: true,
    });
    this.getLocation();
  }

  // grab location of user
  getLocation() {
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        this.getShowtimeData(latitude, longitude);
      },
      () => {
        console.log('error');
      },
    );
  }

  // get showtime info based on user location
  getShowtimeData(lat, long) {
    // hardcode film id
    const filmID = 272263;
    // get current date in proper format for API
    const date = new Date();
    let month = date.getUTCMonth() + 1;
    month < 10 ? month = `0${month}` : null;
    let day = date.getUTCDate();
    day < 10 ? day = `0${day}` : null;
    const year = date.getUTCFullYear();
    console.log(`${year}-${month}-${day}`);
    // get date and time in proper format for headers
    const dateAndTime = date.toISOString();
    // using movieglu api, fetch showtimes and cinemas
    fetch(`https://api-gate2.movieglu.com/filmShowTimes/?film_id=${filmID}&date=${year}-${month}-${day}`, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        client: 'PERS_27',
        'x-api-key': `${API_KEY}`,
        authorization: 'Basic UEVSU18yNzpsanpzN1VnRjhUQjA=',
        'api-version': 'v200',
        territory: 'US',
        'device-datetime': `${dateAndTime}`,
        geolocation: `${lat};${long}`,
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            showtimeInfo: result,
          });
        },
        (error) => {
          this.setState({
            showtimeInfo: error,
          });
        },
      );
  }

  render() {
    // move App container component here to utilize state
    // if 'GO' clicked: make container slightly bigger
    // refactor if possible to avoid using styled comps inside render
    const Container = window.styled.section`
      background: #262626;
      height: ${this.state.locationSearched ? '79vh' : '72vh'};
      width: ${this.state.locationSearched ? '400px' : '395px'};
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 47.5% 5% 47.5%;
      clear: left;
   `;
    const MovieWrapper = window.styled.div`
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      padding-left: ${this.state.locationSearched ? '8.75px' : '7.5px'};
  `;
    //  ensure data for movie info is received before rendering
    // display this if movie info is ready and user has not clicked search/go
    if (this.state.movieInfo && !this.state.locationSearched) {
      console.log('what is state?', this.state);
      return (
        <div>
          <MovieNavbar movie={this.state.movieInfo} />
          <ContentWrapper>
            <Container>

              <PosterWrapper>
                <MoviePoster poster={this.state.poster} />
              </PosterWrapper>

              <MovieWrapper>
                <MovieInfo info={this.state.movieInfo} />
              </MovieWrapper>

              <Options />

              <LocationSearch info={this.state.movieInfo} handleSearch={this.changeLocationSearchStatus.bind(this)} />

            </Container>
          </ContentWrapper>
        </div>
      );
    } if (this.state.movieInfo && this.state.locationSearched && this.state.showtimeInfo) {
      console.log('what is state?', this.state);
      return (
        <div>
          <MovieNavbar movie={this.state.movieInfo} />
          <ContentWrapper>
            <Container>

              <PosterWrapper>
                <MoviePoster poster={this.state.poster} />
              </PosterWrapper>

              <MovieWrapper>
                <MovieInfo info={this.state.movieInfo} />
              </MovieWrapper>

              <Options />

              <LocationShowTimes showInfo={this.state.showtimeInfo} />

            </Container>
          </ContentWrapper>
        </div>
      );
    }
    return (
      <div>ERROR</div>
    );
  }
}

export default App;
