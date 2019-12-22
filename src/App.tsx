import React, { useReducer, Context, createContext } from 'react';
import './App.css';
import { Header } from './components/Elements/Header';
import { configReducer, initialConfig } from './state';
import { Configuration, UseConfigStore, ConfigStore } from './state/types';
import { CustomColors } from './components/CustomColors';
import { Content } from './components/Elements/Content';

export const ConfigurationContext: Context<ConfigStore<Configuration>> = createContext({});

const useConfigStore: UseConfigStore<Configuration> = () => {
    const [config, dispatch] = useReducer(configReducer, initialConfig);

    const getState = (): Configuration => config;

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
                    <CustomColors />
                </Content>
            </div>
        </ConfigurationContext.Provider>
    );
};

export default App;
