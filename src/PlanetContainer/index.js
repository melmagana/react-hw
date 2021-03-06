import React, {Component} from 'react'
import PlanetList from '../PlanetList'
import NewPlanetForm from '../NewPlanetForm'
import EditPlanetModal from '../EditPlanetModal'

export default class PlanetContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			planets: [],
			planetToEdit: -1
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
	deletePlanet = async (planetToDelete) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/planets/' + planetToDelete

		try {
			const deletePlanetResponse = await fetch(url, {
				method: 'DELETE'
			})
			console.log('deletePlanetResponse', deletePlanetResponse)

			const deletePlanetJson = await deletePlanetResponse.json()
			console.log('deletePlanetJson',deletePlanetJson)

			if(deletePlanetResponse.status === 200) {
				this.setState({
					planets: this.state.planets.filter(planet => planet.id !== planetToDelete)
				})
			}

		} catch(err) {
			console.error('Error deleting planet')
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
	editPlanet = (planetToEdit) => {
		console.log('here is what you get after trying to edit planet with id:')
		console.log(planetToEdit)

		this.setState({
			planetToEdit: planetToEdit
		})

	}
	updatePlanet = async (planetToUpdate) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/planets/' + this.state.planetToEdit

		try {
			const updatePlanetResponse = await fetch(url, {
				method: 'PUT',
				body: JSON.stringify(planetToUpdate),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('updatePlanetResponse', updatePlanetResponse)

			const updatePlanetJson = await updatePlanetResponse.json()
			console.log('updatePlanetJson', updatePlanetJson)

			if(updatePlanetResponse.status === 200) {
				const planets = this.state.planets
				const idxUpdatedPlanet = planets.findIndex(planet => planet.id === this.state.planetToEdit)
				planets[idxUpdatedPlanet] = updatePlanetJson.data

				this.setState({
					planets: planets,
					planetToEdit: -1
				})
			}
			this.setState({
				planetToEdit: -1
			})
			this.retrievePlanetData()

		} catch(err) {
			console.error('Error updating planet')
		}
	}

	render() {
		// console.log('here is this.state in render() in PlanetContainer')
		// console.log(this.state)
		return(
			<div className="PlanetContainer">
				<h2>Planet Cards</h2>
				<NewPlanetForm 
					addPlanet={this.addPlanet} 
				/>
				<PlanetList 
					planets={this.state.planets} 
					deletePlanet={this.deletePlanet} 
					editPlanet={this.editPlanet}
				/>
				{
					this.state.planetToEdit !== -1 
					&& 
					<EditPlanetModal 
						editingPlanet={this.state.planets.find((planet) => planet.id === this.state.planetToEdit)} 
						updatePlanet={this.updatePlanet}
					/>
				}
			</div>
		)
	}
}