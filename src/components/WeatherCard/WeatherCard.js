import React from 'react';
import './WeatherCard.scss';

function WeatherCard({
  city,
  temp_min,
  temp_max,
  temp,
  description,
  weatherIcon,
  error,
}) {
  return (
    <div className='cards'>
      {error ? (
        <h1>Sorry!Please type a valid city and country</h1>
      ) : (
        <div>
          {' '}
          <div className='icon'>
            <h1>{city}</h1>
            <h1>
              <i className={`wi ${weatherIcon} display-1`} />
            </h1>
          </div>
          {temp ? <h1>{temp}&deg;</h1> : null}
          {minmaxTemp(temp_max, temp_min)}
          <h2>{description}</h2>
        </div>
      )}
    </div>
  );
}

function minmaxTemp(min, max) {
  return (
    <h3>
      {min ? <span className='px-4'>{min}&deg; </span> : null}
      {max ? <span className='px-4'>{max}&deg; </span> : null}
    </h3>
  );
}
export default WeatherCard;
