import React from 'react';
import './App.scss';
import { Week } from './week-weather/week';

import title from './images/title.png';
import { OldWeather } from './old_weather/old_weather';

function App() {
	return (
		<div className="App">
			<div className="a_title_position">
				<img src={title} alt="title" className="a_title" />
			</div>

			<div className="a_week_container">
				<Week />
				<OldWeather />
			</div>
		</div>
	);
}

export default App;
