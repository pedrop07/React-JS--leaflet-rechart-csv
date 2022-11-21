import React, { useEffect, useState } from "react";
import {
	BarChart,
	ResponsiveContainer,
	Legend, Tooltip,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';
import './charts.css'

export function Chart() {

	const [dataChart, setDataChart] = useState([]);
	// const [csv, setCsv] = useState();

	function csvToArray(str, delimiter = ",") {
		const headers = str.slice(0, str.indexOf("\n")).trim().split(delimiter);
		const rows = str.slice(str.indexOf("\n") + 1).split("\n");

		const arr = rows.map(function (row) {
			const values = row.trim().split(delimiter);
			const el = headers.reduce(function (object, header, index) {
				object[header] = values[index];
				return object;
			}, {});

			return el;
		});

		return arr;
	}

	function arrayToCsv() {
		const titleKeys = Object.keys(dataChart[0]);
		const refinedData = [];
		refinedData.push(titleKeys);

		dataChart.forEach(item => {
			refinedData.push(Object.values(item));
		})
		return refinedData.join('\n');
	}

	useEffect(() => {
		fetch(`/test.csv`, {
			method: "GET",
			headers: {
				'content-type': 'text/csv;charset=UTF-8'
			}
		})
			.then(res => res.text())
			.then(data => {
				// setCsv("data:text/csv;charset=utf-8,"+data);
				setDataChart(csvToArray(data));
			})
	}, []);

	function exportCsv() {
		const csv = arrayToCsv();
		const uri = "data:text/csv;charset=utf-8," + csv;
		var encodedUri = encodeURI(uri);
		window.open(encodedUri);
	};

	return (
		<>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={dataChart}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="year" />
					<YAxis />
					<Tooltip />
					<Legend payload={[{ value: 'População do Brasil' }]} />
					<Bar
						dataKey="population"
						fill="#212121"
					/>
				</BarChart>
			</ResponsiveContainer>

			<button onClick={exportCsv}>
				Extrair como csv
			</button>
		</>
	);
}
