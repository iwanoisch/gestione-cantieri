import {RootState, useAppDispatch} from "./store/store.ts";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout.tsx";
import {HomePage} from "./pages/home-page/HomePage.tsx";
import {Login} from "./pages/login/Login.tsx";
import {Dashboard} from "./pages/dashboard/Dashboard.tsx";
import {start} from "./features/init/slice/initSlice.ts";
import {Project} from "./pages/project/Project.tsx";
import {useEffect} from "react";

function App() {
    // Hook di init
    const init = useSelector((state: RootState) => state.init);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(start(true));
        console.log('initial state', init.start);
    }, [dispatch, init.start]);

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/project/:projectId" element={<Project/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
