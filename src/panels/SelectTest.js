import React from 'react';
import PropTypes from 'prop-types';
import { Div, PanelHeader, PanelHeaderBack, Panel, CardGrid, Card } from '@vkontakte/vkui';

const tests = [
    {
        id: 0,
        title: 'Основная информация и история'
    },
    {
        id: 1,
        title: 'Режимы игры'
    },
    {
        id: 2,
        title: 'Матчмейкинг'
    },
    {
        id: 3,
        title: 'Матчмейкинг'
    },
    {
        id: 4,
        title: 'Скины'
    }
];

class SelectTest extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {id, go, selectTest} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Тесты</PanelHeader>
                {tests.map((item, key) =>
                <Div key={key}>
                    <Card mode={"shadow"} onClick={selectTest} data-test={item.id} data-title={item.title}>
                        <Div>
                            {item.title}
                        </Div>
                    </Card>
                </Div>
                    )}
            </Panel>
        );
    }
}

SelectTest.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    selectTest: PropTypes.func.isRequired
};

export default SelectTest;