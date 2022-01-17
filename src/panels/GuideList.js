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
    PanelHeaderButton,
    platform, IOS
} from '@vkontakte/vkui';

import "./Home.css"
import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";

let osName = platform();

let list = [
    {
        id: 0,
        title: "1. Основная информация и история"
    },
    {
        id: 1,
        title: "2. Режимы"
    },
    {
        id: 2,
        title: "3. Матчмейкинг"
    },
    {
        id: 3,
        title: "4. Оружие"
    },
    {
        id: 4,
        title: "5. Экономические виды раундов"
    },
    {
        id: 5,
        title: "6. Скины"
    },
    {
        id: 6,
        title: "7. Сторонние платформы для игры"
    },
    {
        id: 7,
        title: "8. Тренировка"
    }
]

const GuideList = ({ id, go, selectGuide }) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderButton onClick={go} data-to="home">{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>
            Обучение
        </PanelHeader>
        {list.map((item, key) =>
            <Div key={key}>
                <Card mode={"shadow"} onClick={selectGuide} data-guide={item.id}>
                    <Div>
                        {item.title}
                    </Div>
                </Card>
            </Div>
        )}
    </Panel>
);

GuideList.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    selectGuide: PropTypes.func.isRequired
};

export default GuideList;