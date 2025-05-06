import * as ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import {persistor, store} from "./store/store.ts";
import {Provider} from "react-redux";
import {AlertProvider} from "./common/alert/AlertProvider.tsx";
import {PersistGate} from "redux-persist/integration/react";
import {Spinner} from "./common/spinner/Spinner.tsx";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate loading={<Spinner size="xl"/>} persistor={persistor}>
            <AlertProvider>
                <App/>
            </AlertProvider>
        </PersistGate>
    </Provider>
);
