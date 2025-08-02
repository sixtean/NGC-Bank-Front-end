
import { useState, useEffect } from 'react';
import Menu from '../utils/Menu';
import { useTheme } from '../utils/ThemeContext';
import { DashboardController } from '../controllers/ScreensControllers/DashboardController';
import '../styles/Home.css';

/* Telas */
import Dashboard from './Dashboard';
import Settings from './Settings';

function Home () {
    const [verificado, setVerificado] = useState(Boolean);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { lightTheme } = useTheme();

    const screens = [
        <Dashboard />,
        <Settings />,
    ]

    useEffect(() => {
            async function loadData() {
                const data = await DashboardController();
                if (data) {
                    setVerificado(data.verificado);
                }
            }
    
            loadData();
            const interval = setInterval(loadData, 10000);
            return () => clearInterval(interval);
        }, []);

    return (
        <>
            <div className={`container-home ${lightTheme ? 'light' : ''}`}>
                <div className={`containerAviso ${verificado ? 'verify' : 'noVerify'}`}>
                    {verificado === false && (
                        <div className="avisoVerify">
                            ⚠ Sua conta ainda não está verificada. Verifique seu e-mail para ativar todos os recursos da sua conta.
                        </div>
                    )}
                </div>

                <Menu  onSelect={setActiveIndex} />
                <div className="screen-container">
                    {screens[activeIndex]}
                </div>
            </div>
        </>
    )
}
export default Home;