import React, { useState } from 'react';
import './week.scss';
import cloud from '.././images/default_img.png';

// interface state {
// 	degree: number[] | undefined;
// 	photo: string[] | undefined;
// 	date: number[] | undefined;
// }

export const Week: React.FC = () => {
	// the key from openweather
	const API_KEY: string = '81045c11a4f18a1850e1086cbbab0080';

	//changing the state of 'select' to open and close it
	const [openList, setOpenList] = useState(false);

	const List = () => {
		return setOpenList(!openList);
	};

	var lat: number[] = [53.195873, 53.507836, 51.533557, 55.796127, 45.03547];
	var lon: number[] = [50.100193, 49.420393, 46.034257, 49.106405, 38.975313];

	const gettingWeather = async () => {
		const apiUrl =
			await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=53.195873&lon=50.100193&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}
	`);
		const weather = await apiUrl.json();
		console.log(weather);
	};

	// test function
	const changeCity = (lat: number, lon: number, town: string) => {
		var change: any = document.getElementById('city');
		change.setAttribute('value', town);
		// console.log(lat, lon);
		// console.log(town);
		// console.log(change.value);
	};

	return (
		<div className="week_container">
			<div className="week_title">7 Days Forecast</div>
			{/* future 'select' component */}
			<input
				placeholder="Select city"
				id="city"
				readOnly
				className="week_input"
				onClick={() => (List(), gettingWeather())}
			></input>
			<div
				className={`week_city_list ${
					openList ? 'open' : 'close'
				} style={{...props.style}}`}
				onClick={() => List()}
			>
				<div className="week_city_list_container">
					<div
						className="week_select_city"
						id="Samara"
						onClick={() => changeCity(lat[0], lon[0], 'Samara')}
					>
						Samara
					</div>
					<div
						className="week_select_city"
						id="Tolyatti"
						onClick={() => changeCity(lat[1], lon[1], 'Tolyatti')}
					>
						Tolyatti
					</div>
					<div
						className="week_select_city"
						id="Saratov"
						onClick={() => changeCity(lat[2], lon[2], 'Saratov')}
					>
						Saratov
					</div>
					<div
						className="week_select_city"
						id="Kazan"
						onClick={() => changeCity(lat[3], lon[3], 'Kazan')}
					>
						Kazan
					</div>
					<div
						className="week_select_city"
						id="Krasnodar"
						onClick={() => changeCity(lat[4], lon[4], 'Krasnodar')}
					>
						Krasnodar
					</div>
				</div>
			</div>

			<div className="week_cloud">
				<img src={cloud} alt="cloud" />
			</div>
			<div className="week_text">
				Fill in all the fields and the weather will be displayed
			</div>
		</div>
	);
};
