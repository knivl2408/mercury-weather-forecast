import React, { useState } from 'react';
import './old_weather.scss';
import cloud from '.././images/default_img.png';

export const OldWeather: React.FC = () => {
	interface state {
		degree: number | undefined | null;
		date: number | undefined | null;
		photo: number | undefined | null;
	}
	// the key from openweather
	const API_KEY: string = '81045c11a4f18a1850e1086cbbab0080';

	var lat: number[] = [53.195873, 53.507836, 51.533557, 55.796127, 45.03547];
	var lon: number[] = [50.100193, 49.420393, 46.034257, 49.106405, 38.975313];

	const [dataWeather, setOlddataWeather] = useState<state>({
		degree: 0,
		date: 0,
		photo: 0,
	});

	//getting data from openweathermap
	const gettingOldWeather = async (
		lat: number,
		lon: number,
		time: number
	) => {
		const apiUrl =
			await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${API_KEY}

	`);
		const weather = await apiUrl.json();
		console.log(weather);

		var day: number = 0;
		var dates: number = 0;
		var degrees: number = 0;
		var photos: number = 0;
		const moment = require('moment');

		// while (day < 7) {
		// 	var dat = new Date(weather.daily[day].dt * 1000);
		// 	var dt = dat.toISOString();
		// 	dates.push(moment(dt).format('LL'));
		// 	degrees.push(Math.round(weather.daily[day].temp.day));
		// 	photos.push(weather.daily[day].weather[0].id);
		// 	day++;
		// }
		setOlddataWeather({ date: dates, degree: degrees, photo: photos });
		return { dates, degrees };
	};

	//changing the state of 'select' to open and close it
	const [openList, setOpenList] = useState(false);

	const List = () => {
		return setOpenList(!openList);
	};

	// change city function
	const changeCity = (town: string) => {
		var change: any = document.getElementById('old_city');
		change.setAttribute('value', town);
		console.log(document.getElementById('old_city'));
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
					id="old_city"
					onClick={() => List()}
				></input>
				<div
					className={`old_weather_city_list ${
						openList ? 'open' : 'close'
					} style={{...props.style}}`}
					onClick={() => List()}
				>
					<div className="old_weather_city_list_container">
						<div
							className="old_weather_select_city"
							onClick={() => changeCity('Samara')}
						>
							Samara
						</div>
						<div
							className="old_weather_select_city"
							onClick={() => changeCity('Tolyatti')}
						>
							Tolyatti
						</div>
						<div
							className="old_weather_select_city"
							onClick={() => changeCity('Saratov')}
						>
							Saratov
						</div>
						<div
							className="old_weather_select_city"
							onClick={() => changeCity('Kazan')}
						>
							Kazan
						</div>
						<div
							className="old_weather_select_city"
							onClick={() => changeCity('Krasnodar')}
						>
							Krasnodar
						</div>
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
