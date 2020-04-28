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
	render() {
		console.log('here is this.state in render() in PlanetContainer')
		console.log(this.state)
		return(
			<div className="PlanetContainer">
				<h2>Planet Cards</h2>
				<NewPlanetForm />
				<PlanetList planets={this.state.planets}/>
			</div>
		)
	}
}