import React, { useState } from 'react';
import './week.scss';
import cloud from '.././images/default_img.png';

export const Week: React.FC = () => {
	interface state {
		degree: number[] | undefined | null;
		date: string[] | undefined | null;
		photo: number[] | undefined | null;
	}

	// the key from openweather
	const API_KEY: string = '81045c11a4f18a1850e1086cbbab0080';

	//changing the state of 'select' to open and close it
	const [openList, setOpenList] = useState(false);

	const List = () => {
		return setOpenList(!openList);
	};

	var lat: number[] = [53.195873, 53.507836, 51.533557, 55.796127, 45.03547];
	var lon: number[] = [50.100193, 49.420393, 46.034257, 49.106405, 38.975313];

	const [dataWeather, setdataWeather] = useState<state>({
		degree: [],
		date: [],
		photo: [],
	});

	// if (
	// 	dataWeather.degree != undefined &&
	// 	dataWeather.degree != null &&
	// 	dataWeather.degree?.length > 0
	// ) {
	// 	console.log('dfmvm');
	// 	console.log(dataWeather);
	// }

	//getting data from openweathermap
	const gettingWeather = async (lat: number, lon: number) => {
		const apiUrl =
			await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}
	`);
		const weather = await apiUrl.json();
		console.log(weather);

		var day: number = 0;
		var dates: any[] = [];
		var degrees: number[] = [];
		var photos: number[] = [];
		const moment = require('moment');

		while (day < 7) {
			var dat = new Date(weather.daily[day].dt * 1000);
			var dt = dat.toISOString();
			dates.push(moment(dt).format('LL'));
			degrees.push(Math.round(weather.daily[day].temp.day));
			photos.push(weather.daily[day].weather[0].id);
			day++;
		}
		setdataWeather({ date: dates, degree: degrees, photo: photos });
		return { dates, degrees };
	};

	// check input empty or not
	const Validation = () => {
		if (document.getElementById('city')?.hasAttribute('value') == false) {
			return (
				document
					.getElementById('city')
					?.setAttribute('value', 'city is not selected'),
				document
					.getElementById('city')
					?.setAttribute('class', 'validation week_input')
			);
		} else {
			{
				document
					.getElementById('city')
					?.setAttribute('class', ' week_input');
			}
		}
	};

	// change city function
	const changeCity = (town: string) => {
		var change: any = document.getElementById('city');
		change.setAttribute('value', town);
		console.log(document.getElementById('city'));
	};

	// put date, photo, temperature to card
	const getDate = (dataWeather: any, id: number) => {
		if (dataWeather.date != undefined)
			return (
				<div>
					<div>{dataWeather.date[id]}</div>
					<div>{dataWeather.degree[id]}</div>
				</div>
			);
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
				onClick={() => (List(), Date())}
			></input>
			<div
				className={`week_city_list ${
					openList ? 'open' : 'close'
				} style={{...props.style}}`}
				onClick={() => (List(), Validation())}
			>
				<div className="week_city_list_container">
					<div
						className="week_select_city"
						id="Samara"
						onClick={() => (
							changeCity('Samara'),
							gettingWeather(lat[0], lon[0]),
							Validation()
							// getDate(dataWeather, 1)
						)}
					>
						Samara
					</div>
					<div
						className="week_select_city"
						id="Tolyatti"
						onClick={() => (
							changeCity('Tolyatti'),
							gettingWeather(lat[1], lon[1]),
							Validation()
						)}
					>
						Tolyatti
					</div>
					<div
						className="week_select_city"
						id="Saratov"
						onClick={() => (
							changeCity('Saratov'),
							gettingWeather(lat[2], lon[2]),
							Validation()
						)}
					>
						Saratov
					</div>
					<div
						className="week_select_city"
						id="Kazan"
						onClick={() => (
							changeCity('Kazan'),
							gettingWeather(lat[3], lon[3]),
							Validation()
						)}
					>
						Kazan
					</div>
					<div
						className="week_select_city"
						id="Krasnodar"
						onClick={() => (
							changeCity('Krasnodar'),
							gettingWeather(lat[4], lon[4]),
							Validation()
						)}
					>
						Krasnodar
					</div>
				</div>
			</div>

			<div className="week_cloud">
				{/* <img src={cloud} alt="cloud" /> */}
				<div>
					<div className="week_cards_left_arrow"></div>
					<div className="week_weather_cards">
						<div className="week_weather_card" id="1">
							{getDate(dataWeather, 1)}
						</div>
						<div className="week_weather_card" id="2">
							{getDate(dataWeather, 2)}
						</div>
						<div className="week_weather_card" id="3">
							{getDate(dataWeather, 3)}
						</div>
						<div className="week_weather_card" id="4">
							{getDate(dataWeather, 4)}
						</div>
						<div className="week_weather_card" id="5">
							{getDate(dataWeather, 5)}
						</div>
						<div className="week_weather_card" id="6">
							{getDate(dataWeather, 6)}
						</div>
						<div className="week_weather_card" id="7">
							{getDate(dataWeather, 7)}
						</div>
					</div>
					<div className="week_cards_right_arrow"></div>
				</div>
			</div>
			<div className="week_text">
				Fill in all the fields and the weather will be displayed
			</div>
		</div>
	);
};
