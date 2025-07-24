import { useState, useEffect } from "react";
import { useTheme } from "../utils/ThemeContext";
import '../styles/Dashboard.css';

function Dashboard() {

    const { lightTheme, toggleTheme } = useTheme();
    const [ showBallon, setShowBallon ] = useState(false);

    const [currency, setCurrency] = useState('BRL');
    const [language, setLanguage] = useState('Eng');
    const [dados, setDados] = useState({
        nome: 'Leandro'
    });

    const toggleBallon = () => {
        setShowBallon(prev => !prev);
    };

    useEffect(() => {
        handleAPI();
    }, []);
    
    const handleThemeToggle = toggleTheme;

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleAPI = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/user/home', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });


            if (!response.ok) {
                console.error('Erro ao buscar dados do usuário');
                return;
            }

            const data = await response.json();
            setDados({ nome: data.nome })
        } catch (error) {
            console.error('Erro na API:', error);
        }
    };

    return (
        <>
            <section className='topo-home'>
                <div className='languages'>
                    <a href="#">
                        <i className="bi bi-list-nested"></i>
                    </a>

                    <div className="currency-selector">
                        <select
                            id='currency'
                            value={currency}
                            onChange={handleCurrencyChange}
                            className='select-currency'
                        >
                            <option value="BRL">BRL</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <i className="bi bi-chevron-down custom-chevron"></i>
                    </div>

                    <div className="language-selector">
                        <select
                            id='currency'
                            value={language}
                            onChange={handleLanguageChange}
                            className='select-language'
                        >
                            <option value="BRL">Eng</option>
                            <option value="USD">Port</option>
                            <option value="EUR">Esp</option>
                        </select>
                        <i className="bi bi-chevron-down custom-chevron"></i>
                    </div>
                </div>
                    
                <div className='dados-profile'>
                    <button className='theme' onClick={handleThemeToggle}>
                        <i className={`bi ${lightTheme ? 'bi-moon-stars-fill' : 'bi-brightness-high-fill'}`}></i>
                    </button>

                    <div className='notify' onClick={e => {e.preventDefault(), toggleBallon() }}>
                        <a href="#">
                            <i className="bi bi-bell"></i>
                        </a>
                        {showBallon && (
                            <div className="ballon">
                                <div className="arrow"></div>
                                <p>Novas Novidades!!!</p>
                            </div>
                        )}
                    </div>

                    <div className="profile">
                        <h4>{dados.nome}</h4>
                        <div className="profile-border">
                            <img src="../assets/img/background.jpg" alt="Profile" className='profile-img' />
                        </div>
                    </div>
                </div>
            </section>

            <div className="subside">
                <h1><strong>Welcome</strong>, {dados.nome}</h1>
            </div>

            <div className="quests-home">

            </div>
        </>
    )
}

export default Dashboard;