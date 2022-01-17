import React from 'react';
import PropTypes from 'prop-types';

import {
	Panel,
	PanelHeader,
	Header,
	Button,
	Group,
	Cell,
	Div,
	Avatar,
	Card,
	FixedLayout,
	PromoBanner
} from '@vkontakte/vkui';

import "./Home.css"

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Академия CS:GO</PanelHeader>
		<Div onClick={go} data-to={"guideList"} className={"menu-button-parent"}>
			<Card mode={"shadow"} id={"learn"} className={"menu-button"}>
				<Div className={"menu-button-title"}>
					<div>
						Обучение
					</div>
				</Div>
			</Card>
		</Div>
		<Div onClick={go} data-to={"selectTest"} className={"menu-button-parent"}>
			<Card mode={"shadow"} id={"tests"} className={"menu-button"}>
				<Div className={"menu-button-title"}>
					<div>
						Тесты
					</div>
				</Div>
			</Card>
		</Div>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
