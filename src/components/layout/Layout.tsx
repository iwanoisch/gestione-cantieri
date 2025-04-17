import {LayoutPagePros} from "./layout.type.ts"
import MainMenuBar from "../../common/mainMenuBar/MainMenuBar.tsx";
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Spinner} from "../../common/spinner/Spinner.tsx";


export const Layout = ({children}: LayoutPagePros) => {
    const {isAuthenticated, checkAuth, isLoading} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const publicPaths = ['/', '/login'];
    const excludePath = ['/login'];

    useEffect(() => {
        const verifyAuth = async () => {
            // Se non è una route pubblica, verifica l'autenticazione
            if (!publicPaths.includes(location.pathname) && !isAuthenticated) {
                const isAuth = await checkAuth();
                if (!isAuth) {
                    navigate('/', { replace: true }); // Usa replace: true per evitare doppi salti
                }
            }
        };

        void verifyAuth();
    }, [location.pathname, navigate, checkAuth, isAuthenticated]); // Aggiungi tutte le dipendenze

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size="xl"/>
            </div>
        )
    }


    if (excludePath.includes(location.pathname)) return <div>{children}</div>;

    return (
        <>
            <MainMenuBar/>
            <div>
                {children}
            </div>
        </>

    )
}
