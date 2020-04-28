import React, {Component} from 'react'
import {Form, Button, Label, Segment} from 'semantic-ui-react'

export default class EditPlanetModal extends Component {
	constructor(props) {
		super(props)
		console.log('props in constructor in EditPlanetModal')
		console.log(props)

		this.state = {
			name: props.editingPlanet.name,
			planet_type: props.editingPlanet.planet_type,
			length_of_year: props.editingPlanet.length_of_year,
			moons: props.editingPlanet.moons
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	render() {
		return (
			<Segment>
				<h3>Enter New Info</h3>
				<Form>
					<Label>Name</Label>
					<Form.Input
						type='text'
						name='name'
						value={this.state.name}
						placeholder='Enter Planet Name'
						onChange={this.handleChange}
					/>
					<Label>Planet Type</Label>
					<Form.Input
						type='text'
						name='planet_type'
						value={this.state.planet_type}
						placeholder='Enter Planet Type'
						onChange={this.handleChange}
					/>
					<Label>Length of Year</Label>
					<Form.Input
						type='text'
						name='length_of_year'
						value={this.state.length_of_year}
						placeholder='Length of Year On Planet'
						onChange={this.handleChange}
					/>
					<Label>Moons</Label>
					<Form.Input
						type='number'
						name='moons'
						value={this.state.moons}
						placeholder='Number of Moons'
						onChange={this.handleChange}
					/>
					<Button type='Submit' inverted color='purple'>
        				Update Planet!
      				</Button>
				</Form>
			</Segment>
		)
	}
}