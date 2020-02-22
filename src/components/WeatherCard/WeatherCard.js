import React from 'react';
import './WeatherCard.scss';

function WeatherCard({
  city,
  temp_min,
  temp_max,
  temp,
  description,
  weatherIcon,
}) {
  return (
    <div>
      <div className='cards'>
        <h1>{city}</h1>
        <h1>
          <i className={`wi ${weatherIcon} display-1`} />
        </h1>

        {temp ? <h1>{temp}&deg;</h1> : null}

        {/**show max min temp */}
        {minmaxTemp(temp_max, temp_min)}

        <h2>{description}</h2>
      </div>
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
