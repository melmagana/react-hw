import React, {Component} from 'react'
import PlanetList from '../PlanetList'
import NewPlanetForm from '../NewPlanetForm'

export default class PlanetContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			planets: []
		}
	}
	componentDidMount() {
		this.retrievePlanetData()
	}
	retrievePlanetData = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/api/v1/planets/'
			console.log('about to fetch data from:')
			console.log(url)

			const planetResponse = await fetch(url)
			console.log('Response from fetch call:')
			console.log(planetResponse)

			const planetJson = await planetResponse.json()
			console.log('retrievePlanetData:')
			console.log(planetJson)

			this.setState({
				planets: planetJson.data
			})

		} catch (err) {
			console.error('Error retrieving planet data')
			console.error(err)
		}
	}
	addPlanet = async (planetToAdd) => {
		console.log('here is the planet you are trying to add')
		console.log(planetToAdd)

		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/planets/'
			const addPlanetResponse = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(planetToAdd),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('addPlanetResponse', addPlanetResponse)

			const addPlanetJson = await addPlanetResponse.json()
			console.log('here is what we get after trying to add planet:')
			console.log(addPlanetJson)

			if(addPlanetResponse.status === 201) {
				const planets = this.state.planets
				planets.push(addPlanetJson.data)
				this.setState({
				planets: planets
				})
			}

		} catch(err) {
			console.error('Error adding planet')
			console.error(err)
		}
	}
	render() {
		// console.log('here is this.state in render() in PlanetContainer')
		// console.log(this.state)
		return(
			<div className="PlanetContainer">
				<h2>Planet Cards</h2>
				<NewPlanetForm addPlanet={this.addPlanet} />
				<PlanetList planets={this.state.planets}/>
			</div>
		)
	}
}