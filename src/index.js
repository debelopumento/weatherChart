import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as d3 from 'd3'
import axios from 'axios'


class Svg extends Component {
	
	componentDidMount() {
		const WIDTH = 1000
		const HEIGHT = 500
		const MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
		}
		console.log(2)

		axios.get('http://api.wunderground.com/api/515155f28af51941/hourly/q/CA/San_Francisco.json')
			.then(function(res) {
				console.log(3, res.data)
				const data = res.data
				const data3 = [
	                {"temperature": parseInt(data.hourly_forecast[0].temp.english),
	                 "time": parseInt(data.hourly_forecast[0].FCTTIME.hour)
	                },
	                {"temperature": parseInt(data.hourly_forecast[1].temp.english),
	                 "time": parseInt(data.hourly_forecast[1].FCTTIME.hour)
	                },
	                {"temperature": parseInt(data.hourly_forecast[2].temp.english),
	                 "time": parseInt(data.hourly_forecast[2].FCTTIME.hour)
	                },
	                {"temperature": parseInt(data.hourly_forecast[3].temp.english),
	                 "time": parseInt(data.hourly_forecast[3].FCTTIME.hour)
	                },
	                {"temperature": parseInt(data.hourly_forecast[4].temp.english),
	                 "time": parseInt(data.hourly_forecast[4].FCTTIME.hour)
	                },
	            ]
	            console.log(4, data3)
	          	const xScale = d3.scaleLinear().range([20, 480]).domain([13, 17])
				const yScale = d3.scaleLinear().range([480, 20]).domain([50, 70])
				const xAxis = d3.axisBottom().scale(xScale)
				const yAxis = d3.axisLeft().scale(yScale)
				const vis = d3.select("#visualisation")
				vis.append("rect")
		                .attr("width", "100%")
		                .attr("height", "100%")
		                .attr("fill","lightgrey")

		        vis.append("svg:g")
		                .attr("class", "x axis")
		                .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
		                .call(xAxis);
		        vis.append("svg:g")
		                .attr("class", "y axis")
		                .attr("transform", "translate(" + (MARGINS.left) + ",0)")
		                .call(yAxis);
		                

		         const lineGen = d3.line()
			                .x(function(d) {
			                    console.log(4, d.time)
			                    return xScale(d.time);
			                })
			                .y(function(d) {
			                    return yScale(d.temperature);
			                })
			                .curve(d3.curveBasis);


	            vis.append('svg:path')
	                .attr('d', lineGen(data3))
	                .attr('stroke', 'green')
	                .attr('stroke-width', 2)
	                .attr('fill', 'none');  
			})




		



	}

	render() {
				
		return (    
			<div>
				<svg id="visualisation" width="1000" height="500">
					
				</svg>
			</div>
		)
	}
}


ReactDOM.render(
	//<App />,
	<Svg />,
  document.getElementById('root')
);




/*
return (    
	<div>
		<svg id="visualisation" width="1000" height="500">
			<rect width="100%" height="100%" fill="pink"></rect>
			<g className="x axis" transform="translate(0, 480)">
				<g className="tick" transform="translate(933.5,0)">
					<line y="9" x="0"></line>
					<text y="18" x="0">4</text>
				</g>
				<path className="domain" d="M50,6V0H980V6"></path>
			</g>
		</svg>
	</div>
)
*/
