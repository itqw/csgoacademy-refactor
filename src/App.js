import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import GuideList from "./panels/GuideList";
import Guide from "./panels/Guide";
import SelectTest from "./panels/SelectTest";
import Test from "./panels/Test";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);
	const [guideId, setGuideId] = useState(0);
	const [testId, setTestId] = useState(0);
	const [title, setTitle] = useState("");
	const [ad, setAd] = useState(1);

	useEffect(() => {
		setPopout(null);
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const selectGuide = e => {
		setGuideId(parseInt(e.currentTarget.dataset.guide))
		setActivePanel("guide");
	}

	const selectTest = e => {
		setTestId(parseInt(e.currentTarget.dataset.test));
		setTitle(e.currentTarget.dataset.title);
		setActivePanel("test")
	}

	const guideList = e => {
		if(ad) {
			bridge.send("VKWebAppShowNativeAds", {ad_format: "interstitial"}).then(r => {
				setAd(0)
				setTimeout(() => {setAd(1)}, 300000)
			})
		}
		setActivePanel("guideList")
	}
	const testList = e => {
		if(ad) {
			bridge.send("VKWebAppShowNativeAds", {ad_format: "interstitial"}).then(r => {
				setAd(0)
				setTimeout(() => {setAd(1)}, 300000)
			})
		}
		setActivePanel("selectTest")
	}

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} go={go}/>
					<GuideList selectGuide={selectGuide} id={"guideList"} go={go}/>
					<Guide id={"guide"} go={go} guideId={guideId} guideList={guideList}/>
					<SelectTest id={"selectTest"} go={go} selectTest={selectTest}/>
					<Test id={"test"} go={go} testId={testId} testList={testList} title={title}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
