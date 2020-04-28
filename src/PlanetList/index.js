import React from 'react'
import {Card, Button, Icon} from 'semantic-ui-react'

export default function PlanetList(props) {
	console.log('props in PlanetList')
	console.log(props)

	const planets = props.planets.map((planet) => {
		return(
			<Card key={planet.id}>
				<Card.Content>
					<Card.Header>
						{planet.name}
					</Card.Header>
					<Card.Meta>
						{planet.planet_type}
					</Card.Meta>
					<Card.Description>
						On {planet.name}, one year is equivalent to {planet.length_of_year}.
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Icon name="moon outline" />
					{planet.moons}
				</Card.Content>
				<Card.Content>
					<Button basic color='red' 
						onClick={() => props.deletePlanet(planet.id)}
					>
						Delete {planet.name}
					</Button>
					<Button basic color='yellow'
						onClick={() => props.editPlanet(planet.id)}
					>
						Edit {planet.name}
					</Button>
				</Card.Content>
			</Card>

		)
	})
	return(
		<React.Fragment>
			<Card.Group centered={true}>
				{planets}
			</Card.Group>
		</React.Fragment>

	)

}