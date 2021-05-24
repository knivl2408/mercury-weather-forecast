import React, { useState } from 'react';
import './week.scss';
import cloud from '.././images/default_img.png';
import right_arrow from '.././images/icon1.png';
import left_arrow from '.././images/icon.png';

export const Week: React.FC = () => {
	interface state {
		degree: number[] | undefined | null;
		date: string[] | undefined | null;
		photo: string[] | undefined | null;
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
		var photos: string[] = [];
		const moment = require('moment');

		while (day < 7) {
			var dat = new Date(weather.daily[day].dt * 1000);
			var dt = dat.toISOString();
			dates.push(moment(dt).format('LL'));
			degrees.push(Math.round(weather.daily[day].temp.day));
			photos.push(weather.daily[day].weather[0].icon);
			day++;
		}
		setdataWeather({ date: dates, degree: degrees, photo: photos });
		console.log('dkdk');
		console.log(dataWeather);
		return { dates, degrees, photos };
	};

	// check input empty or not
	const Validation = () => {
		if (document.getElementById('city')?.hasAttribute('value') == false) {
			return (
				document
					.getElementById('city')
					?.setAttribute('placeholder', 'city is not selected'),
				document
					.getElementById('city')
					?.setAttribute('class', 'validation week_input')
			);
		} else {
			{
				document
					.getElementById('city')
					?.setAttribute('class', ' week_input');
				document
					.getElementById('cloud')
					?.setAttribute('class', 'close');
				document
					.getElementById('week_text')
					?.setAttribute('class', 'close');
				document
					.getElementById('weather_cards')
					?.setAttribute('class', 'open');
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
	const getWeather = (dataWeather: any, id: number) => {
		if (dataWeather.date != undefined)
			return (
				<div className="week_weather_card_data">
					<div className="week_weather_card_data_date">
						{dataWeather.date[id]}
					</div>
					<div className="week_weather_card_data_photo">
						<img
							src={`https://api.openweathermap.org/img/w/${dataWeather.photo[id]}.png`}
							// className="week_weather_card_data_photo"
						/>
					</div>
					<div className="week_weather_card_data_temperature">
						{dataWeather.degree[id]}°
					</div>
				</div>
			);
	};

	const MoveRight = () => {
		return document.getElementById('week')?.scrollBy(150, 0);
	};
	const MoveLeft = () => {
		return document.getElementById('week')?.scrollBy(-150, 0);
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

			<div>
				<img src={cloud} alt="cloud" id="cloud" />
				<div className="close" id="weather_cards">
					<div className="week_weather_cards_left_arrow">
						<img
							src={left_arrow}
							alt="<"
							className="week_weather_cards_left_arrow"
							onClick={() => MoveLeft()}
						/>
					</div>
					<div className="week_weather_cards" id="week">
						<div className="week_weather_card" id="1">
							{getWeather(dataWeather, 0)}
						</div>
						<div className="week_weather_card" id="2">
							{getWeather(dataWeather, 1)}
						</div>
						<div className="week_weather_card" id="3">
							{getWeather(dataWeather, 2)}
						</div>
						<div className="week_weather_card" id="4">
							{getWeather(dataWeather, 3)}
						</div>
						<div className="week_weather_card" id="5">
							{getWeather(dataWeather, 4)}
						</div>
						<div className="week_weather_card" id="6">
							{getWeather(dataWeather, 5)}
						</div>
						<div className="week_weather_card" id="7">
							{getWeather(dataWeather, 6)}
						</div>
						<div className="week_weather_card_margin"></div>
					</div>
					<div>
						<img
							src={right_arrow}
							alt=">"
							className="week_weather_cards_right_arrow"
							onClick={() => MoveRight()}
						/>
					</div>
				</div>
			</div>
			<div className="week_text" id="week_text">
				Fill in all the fields and the weather will be displayed
			</div>
		</div>
	);
};
