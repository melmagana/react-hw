import React, {Component} from 'react'

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

		} catch (err) {
			console.error('Error retrieving planet data')
			console.error(err)
		}
	}
	render() {
		return(
			<div className="PlanetContainer">
				<h2>Planet Container</h2>
			</div>
		)
	}
}