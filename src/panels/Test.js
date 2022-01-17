import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, PanelHeader, PanelHeaderButton, Panel, FixedLayout, SimpleCell, Button, Div, Placeholder, InfoRow, Separator, PanelSpinner } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import { Icon56CancelCircleOutline } from '@vkontakte/icons';
import { Icon24ShareOutline } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";

const osName = platform();

let questions = [];
//question - сам вопрос
//correctAnswer - номер ответа. Например, варианты ответа: тест1, тест2, тест3. Если правильный ответ "тест3", то сюда пишем 2.
//answers - варианты ответа через ;

class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nowQuestion: 0,
            showResult: false,
            correctAnswers: 0,
            loader: true
        };

        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentDidMount() {
        questions = [];
        // eslint-disable-next-line
        switch (this.props.testId) {
            case 0:
                questions = [
                    {question: 'В каком году вышла Counter-Strike: Global Offensive?', correctAnswer: 0, answers: '2012;2011;2013;2010'},
                    {question: 'В каком году была выпущена первая бета-версия Counter-Strike?', correctAnswer: 1, answers: '2000;1999;2002;1997'},
                    {question: 'Кто положил начало истории Counter-Strike?', correctAnswer: 0, answers: 'Минх Ле;Гейб Ньюэлл;John McDonald;Компания VALVE'},
                    {question: 'В каком году вышли Counter-Strike: Condition Zero и Source?', correctAnswer: 1, answers: '2007;2004;2005;2006'},
                    {question: 'В каком году разрабатывали мод для игры Quake, который отдаленно напоминал Counter-Strike?', correctAnswer: 2, answers: '1997;1994;1996;1995'}
                ];
                break;
            case 1:
                questions = [
                    {question: 'Сколько режимов игры есть в Counter-Strike: Global Offensive?', correctAnswer: 0, answers: '6;5;8;7'},
                    {question: 'Сколько нужно победных раундов чтобы выиграть в обычном режиме?', correctAnswer: 2, answers: '16;10;8;12'},
                    {question: 'Как распределяются игроки в режиме "Зачистка"?', correctAnswer: 0, answers: '3 террориста 4 спецназовца;4 террориста 3 спецназовца;4 террориста 4 спецназовца;3 террориста 3 спецназовца'},
                    {question: 'Сколько по времени длится режим бой насмерть?', correctAnswer: 1, answers: '8 минут;10 минут;12 минут;6 минут'},
                    {question: 'Как получить оружие в режиме "Уничтожение объекта"?', correctAnswer: 0, answers: 'Оружие улучшается в начале каждого раунда в зависимости от убийств в прошлом раунде;Купить через меню покупок;Найти на карте и поднять;Ждать пока оно выпадет'}
                ];
                break;
            case 2:
                questions = [
                    {question: 'Сколько нужно выиграть раундов для победы в длинном режиме?', correctAnswer: 0, answers: '16;15;8;12'},
                    {question: 'Максимальное количество раундов в длинном режиме?', correctAnswer: 1, answers: '16;30;24;32'},
                    {question: 'Сколько времени есть у спецназа для обезвреживания бомбы?', correctAnswer: 1, answers: '30 секунд;40 секунд;50 секунд;60 секунд'},
                    {question: 'Сколько дней блокировки максимально можно получить за выход из игры/убийство своих', correctAnswer: 2, answers: '7 дней;1 день;14 дней;30 дней'},
                    {question: 'Спустя какое количество раундов команды поменяются местами?', correctAnswer: 0, answers: '15 раундов;8 раундов;16 раундов;6 раундов'}
                ];
                break;
            case 3:
                questions = [
                    {question: 'Какое оружие всегда дается в начале раунда?', correctAnswer: 0, answers: 'Для террористов Glock-18, для спецназа USP-S;Для террористов Glock-18, для спецназа P250;Для террористов P250, для спецназа USP-S;Для террористов P2000, для спецназа Glock-18'},
                    {question: 'Сколько есть снайперских винтовок в игре?', correctAnswer: 0, answers: '4;6;3;5'},
                    {question: 'Цена самого дешевого пистолета', correctAnswer: 3, answers: '300$;150$;100$;200$'},
                    {question: 'У какого пистолета больше урон в тело?', correctAnswer: 1, answers: 'Desert Deagle;Revolver R8;P2000;Five-Seven'},
                    {question: 'За убийство из какого пистолета-пулемета не дается 600$?', correctAnswer: 0, answers: 'P90;MP5-SD;ПП-19 Бизон;MAC-10'}
                ];
                break;
            case 4:
                questions = [
                    {question: 'Сколько видов редкости предметов существует в игре?', correctAnswer: 1, answers: '8;7;5;10'},
                    {question: 'В какой редкости предметов находятся ножи, перчатки?', correctAnswer: 0, answers: 'Необычайной;Засекреченной;Тайной;Контрабандной'},
                    {question: 'Сколько качеств предметов есть в игре?', correctAnswer: 3, answers: '6;7;4;5'},
                    {question: 'Самый дорогой скин в игре?', correctAnswer: 0, answers: 'Сувенирный AWP | Dragon Lore;M4A4 | Howl;Bowie knife | Doppler;AWP | Gungnir'},
                    {question: 'Максимальное количество наклеек на скине?', correctAnswer: 1, answers: '5;4;6;3'}
                ];
                break;
        }
        this.setState({
            loader: false
        });
    }

    shareResult() {
        let message = "Я прошёл тест \"%name\" в Академии CS:GO\nМой результат: %correct/%total"
        message = message.replace("%name", this.props.title).replace("%correct", this.state.correctAnswers).replace("%total", "5");
        bridge.send("VKWebAppShowWallPostBox", {
            "message": message,
            "attachments": "https://m.vk.com/app7697100"
        });
    }

    checkAnswer(index) {
        if(index === questions[this.state.nowQuestion].correctAnswer) {
            this.setState({
                nowQuestion: this.state.nowQuestion+1,
                correctAnswers: this.state.correctAnswers+1,
            });
        }

        if(this.state.nowQuestion === questions.length-1) {
            this.setState({
                showResult: true
            });
        }
        else {
            this.setState({
                nowQuestion: this.state.nowQuestion+1
            });
        }
    }

    render() {
        const {id, go, testList} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderButton onClick={testList}>{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>

                </PanelHeader>
                {this.state.loader && <PanelSpinner/>}
                {!this.state.loader && !this.state.showResult && <>
                    <FixedLayout vertical="top">
                        <Div>
                            <Placeholder header={questions[this.state.nowQuestion].question}/>
                        </Div>
                    </FixedLayout>
                    <FixedLayout vertical="bottom">
                        <Div>
                            {questions[this.state.nowQuestion].answers.split(';').map((item, index) =>
                                <Button onClick={() => this.checkAnswer(index)} style={{ marginTop: 8 }} size="xl" stretched><Div>{item}</Div></Button>
                            )}
                        </Div>
                    </FixedLayout>
                </>}
                {!this.state.loader && this.state.showResult && <>
                    <Div style={{textAlign: 'center'}}>
                        {this.state.correctAnswers === 5 && <Placeholder
                            icon={<Icon56CheckCircleOutline fill="#179c00" />}
                            header="Ты успешно прошёл тест!"
                        />}
                        {this.state.correctAnswers < 5 && <Placeholder
                            icon={<Icon56CancelCircleOutline fill="#e64646" />}
                            header="Ты не прошёл тест! :("
                        />}
                            <InfoRow style={{paddingTop: 12}} header="Всего вопросов">
                                {questions.length}
                            </InfoRow>
                            <InfoRow style={{paddingTop: 12}} header="Правильных ответов">
                                {this.state.correctAnswers}
                            </InfoRow>
                            <InfoRow style={{paddingTop: 12}} header="Неправильных ответов">
                                {questions.length - this.state.correctAnswers}
                            </InfoRow>
                        <Div>
                            <Button onClick={testList} size="l" stretched>Вернуться на главную</Button>
                        </Div>
                        <Div>
                            <Button mode={"secondary"} after={<Icon24ShareOutline/>} onClick={() => this.shareResult()} size={"l"} stretched>Поделиться результатом</Button>
                        </Div>
                    </Div>
                </>}
            </Panel>
        );
    }
}

Test.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    testId: PropTypes.number.isRequired,
    testList: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Test;