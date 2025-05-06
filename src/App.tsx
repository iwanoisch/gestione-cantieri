import {RootState, useAppDispatch} from "./store/store.ts";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout.tsx";
import {HomePage} from "./pages/home-page/HomePage.tsx";
import {Login} from "./pages/login/Login.tsx";
import {Dashboard} from "./pages/dashboard/Dashboard.tsx";
import {start} from "./features/init/slice/initSlice.ts";
import {useEffect} from "react";
import {Project} from "./pages/project/Project.tsx";
import {Activities} from "./pages/activities/Activities.tsx";
import {Calendar} from "./pages/calendar/Calendar.tsx";
import {Projects} from "./pages/projects/Projects.tsx";

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
                    <Route path="/activities" element={<Activities/>}/>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/projects/" element={<Projects/>}/>
                    <Route path="/project/:projectId" element={<Project/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
