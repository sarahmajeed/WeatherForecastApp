import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import 'weather-icons/css/weather-icons.css';
import Form from './components/Form/Form';
import Main from './components/Main/Main';

const API_key = '2fd252cc978048d2bfe8a17d9de83970';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: '',
      error: false,
      isClicked: false,
    };

    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-drizzle',
      Rain: 'wi-rain',
      Snow: 'wi_snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // }

  getWeatherIcon = (iconObject, range) => {
    switch (true) {
      case range >= 200 && range <= 232:
        this.setState({
          icon: iconObject.Thunderstorm,
        });
        break;
      case range >= 300 && range <= 321:
        this.setState({
          icon: iconObject.Drizzle,
        });
        break;
      case range >= 500 && range <= 531:
        this.setState({
          icon: iconObject.Rain,
        });
        break;
      case range >= 600 && range <= 622:
        this.setState({
          icon: iconObject.Snow,
        });
        break;
      case range >= 701 && range <= 781:
        this.setState({
          icon: iconObject.Atmosphere,
        });
        break;
      case range === 800:
        this.setState({
          icon: iconObject.Clear,
        });
        break;
      case range >= 801 && range <= 804:
        this.setState({
          icon: iconObject.Clouds,
        });
        break;
      default:
        this.setState({
          icon: iconObject.Clouds,
        });
    }
  };

  getWeather = async e => {
    e.preventDefault();
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name},${response.sys.country}`,
        main: response.weather[0].main,
        temp: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
      });

      // seting icons
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  calCelsius = cel => {
    const celsius = Math.floor(cel - 273.15);
    return celsius;
  };

  handleClick() {
    // this.setState(
    //   {
    //     isClicked: true,
    //   },
    //   console.log(this.state.isClicked)
    // );
    window.location.href = '/weather';
  }
  handleBack() {
    window.location.href = '/';
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/weather'
            render={() => (
              <Form
                loadWeather={this.getWeather}
                error={this.state.error}
                handleBack={this.handleBack}
                city={this.state.city}
                temp_min={this.state.temp_min}
                temp_max={this.state.temp_max}
                temp={this.state.temp}
                description={this.state.description}
                weatherIcon={this.state.icon}
              />
            )}
          />
          <Route
            exact
            path='/'
            render={() => <Main handleClick={this.handleClick} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
