/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { NotFound404 } from "pages/NotFound404";
import { store } from "./store";
import App from "./App";
import {
    AboutMe,
    Notes,
    NoteContent,
    NotesListWithFilter,
    HomePage,
} from "pages";
import pingpong from "./ping-pong"
import reportWebVitals from "./reportWebVitals";

pingpong()

const rootElement = document.getElementById("root");

// Root outlet placed in src\components\Page\Main\index.tsx
const SiteMap = [
    { path: "/", element: <HomePage /> },
    { path: "aboutme", element: <AboutMe /> },
    {
        path: "notes",
        element: <Notes />,
        children: [
            {
                index: true,
                element: <NotesListWithFilter />,
            },
            {
                path: ":noteSlug",
                element: <NoteContent />,
            },
        ],
    },
    { path: "*", element: <NotFound404 /> },
];

const Routes = () => {
    let routes = useRoutes([
        {
            path: "/",
            element: (
                <StrictMode>
                    <App />
                </StrictMode>
            ),
            children: [...SiteMap],
        },
    ]);
    return routes;
};

let appReady = Promise.resolve();

const { worker } = require("./mocks/browser");
appReady = worker.start({
    serviceWorker: {
        url: "/mockServiceWorker.js",
    },
});

appReady.then(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>,
        rootElement
    );
});

reportWebVitals();
