import React, { useReducer, Context, createContext, Dispatch, useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Elements/Header';
import { configReducer, getInitialConfig } from './state';
import { UseConfigStore, ConfigStore, Action, AppState } from './state/types';
import { CustomColors } from './components/CustomColors';
import { Content } from './components/Elements/Content';
import { ConfigOutput } from './components/ConfigOutput';
import { CustomFonts } from './components/CustomFonts';
import { CustomColorSchemes } from './components/CustomColorSchemes';
import debounce from 'lodash/debounce';
import { Information } from './components/Information/Information';

export const ConfigurationContext: Context<ConfigStore<AppState>> = createContext({
    getState: () => getInitialConfig(),
    dispatch: (() => undefined) as Dispatch<Action>,
});

const useConfigStore: UseConfigStore<AppState> = () => {
    const [config, dispatch] = useReducer(configReducer, getInitialConfig());

    const getState = (): AppState => config;

    useEffect(() => {
        localStorage.setItem('drawioconfig', JSON.stringify(config, null, 2));
    }, [config]);

    return {
        getState,
        dispatch,
    };
};

const MIN_NEEDED_WINDOW_WIDTH = 950;
const useWindowSize = (): [number] => {
    const [winWidth, setWidth] = useState(window.innerWidth);

    const handleResize = debounce(() => {
        setWidth(window.innerWidth);
    }, 50);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return [winWidth];
};

const App: React.FC = () => {
    const configStore = useConfigStore();

    const [winWidth] = useWindowSize();

    return (
        <ConfigurationContext.Provider value={configStore}>
            <div className="App">
                <Header />
                <Content>
                    {winWidth >= MIN_NEEDED_WINDOW_WIDTH && (
                        <>
                            <div className="App--layout">
                                <div className="App--main">
                                    <CustomColors />
                                    <CustomColorSchemes />
                                    <CustomFonts />
                                </div>
                                <div className="App--side">
                                    <ConfigOutput />
                                </div>
                            </div>
                            <Information />
                        </>
                    )}

                    {winWidth < MIN_NEEDED_WINDOW_WIDTH && (
                        <div className="App--small-hint">Screen is too small for the editor ;)</div>
                    )}
                </Content>
            </div>
        </ConfigurationContext.Provider>
    );
};

export default App;
