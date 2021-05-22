import React, { useState } from 'react';
import './old_weather.scss';
import cloud from '.././images/default_img.png';

export const OldWeather: React.FC = () => {
	//changing the state of 'select' to open and close it
	const [openList, setOpenList] = useState(false);

	const List = () => {
		return setOpenList(!openList);
	};
	return (
		<div className="old_weather_container">
			<div className="old_weather_title">
				Forecast for a Date in the Past
			</div>
			{/* future 'select' component */}
			<div className="old_weather_inputs">
				<input
					placeholder="Select city"
					className="old_weather_input"
					readOnly
					onClick={() => List()}
				></input>
				<div
					className={`old_weather_city_list ${
						openList ? 'open' : 'close'
					} style={{...props.style}}`}
					onClick={() => List()}
				>
					<div className="old_weather_city_list_container">
						<div className="old_weather_select_city">Samara</div>
						<div className="old_weather_select_city">Tolyatti</div>
						<div className="old_weather_select_city">Saratov</div>
						<div className="old_weather_select_city">Kazan</div>
						<div className="old_weather_select_city">Krasnodar</div>
					</div>
				</div>
				<input
					type="date"
					placeholder="Select date"
					className="old_weather_input"
				/>
			</div>
			<div className="old_weather_cloud">
				<img src={cloud} alt="cloud" />
			</div>
			<div className="old_weather_text">
				Fill in all the fields and the weather will be displayed
			</div>
		</div>
	);
};
