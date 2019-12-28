import React, { useReducer, Context, createContext, Dispatch, useEffect } from 'react';
import './App.css';
import { Header } from './components/Elements/Header';
import { configReducer, getInitialConfig } from './state';
import { UseConfigStore, ConfigStore, Action, AppState } from './state/types';
import { CustomColors } from './components/CustomColors';
import { Content } from './components/Elements/Content';
import { ConfigOutput } from './components/ConfigOutput';
import { CustomFonts } from './components/CustomFonts';
import { CustomColorSchemes } from './components/CustomColorSchemes';

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

const App: React.FC = () => {
    const configStore = useConfigStore();

    return (
        <ConfigurationContext.Provider value={configStore}>
            <div className="App">
                <Header />
                <Content>
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
                </Content>
            </div>
        </ConfigurationContext.Provider>
    );
};

export default App;
