import { useState, useEffect } from "react";
import { useTheme } from "../utils/ThemeContext";
import { DashboardController } from "../controllers/ScreensControllers/DashboardController";

import '../styles/Dashboard.css';
import { refreshTokenController } from "../controllers/auth/Token-Refresh";
import type { Notificacao } from "../services/screensService/DashboardService";

function Dashboard() {
    const { lightTheme, toggleTheme } = useTheme();
    const [ showBallon, setShowBallon ] = useState(false);

    const [currency, setCurrency] = useState('BRL');
    const [language, setLanguage] = useState('Eng');
    const [dados, setDados] = useState({
        nome: ''
    });


    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const [temNotificacoesNovas, setTemNotificacoesNovas] = useState(false);
    const [helpQuests, setHelpQuests] = useState(false);


    const saldos = {
        parceiros: '1.000,00',
        invertimentos: '12.435,00',
        total: '123.123,43'
    }

    const toggleBallon = () => {
        setShowBallon(prev => !prev);
    };
    
    useEffect(() => {
        async function loadData() {
            const data = await DashboardController();
            if (data) {
                setDados({nome: data.nome});
                setNotificacoes(data.notificacoes);
                setTemNotificacoesNovas(data.notificacoes.some(n => !n.lida));
            }
        }

        loadData();
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        refreshTokenController();
      }, []);

    const handleThemeToggle = toggleTheme;

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <>
            <section className={'topo-home'} >
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
                            {temNotificacoesNovas && (
                                <span className="badge-notificacao">{notificacoes.filter(n => !n.lida).length}</span>
                            )}
                        </a>
                        {showBallon && (
                            <div className="ballon">
                                <div className="arrow"></div>
                                {notificacoes.length === 0 ? (
                                    <p>Sem novas notificações.</p>
                                ) : (
                                    <ul className="notificacoes lista">
                                        {notificacoes.map((notif) => (
                                            <li key={notif.id}>
                                                <strong>{notif.titulo}</strong>
                                                <p>{notif.mensagem}</p>
                                                <small>{new Date(notif.criadaEm).toLocaleString()}</small>
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
                <button className="help" onClick={() => setHelpQuests(true)}>
                    <i className="bi bi-question-circle"></i>
                </button>

                {helpQuests && (
                    <>
                        <div className="helpQuests">
                            <button className="exitHelpQuests"onClick={() => setHelpQuests(false)}>
                                <i className="bi bi-x-lg"></i>
                            </button>

                            <h2>Quests</h2>

                            <p>As quests são formas de desbloquear novas conquistas e beneficios para sua conta. <br /><br /> Todos os dias as quests são resetadas então não perca a oportunidade de subir o nivel da sua conta, quanto maior o nivel mais beneficios na NGC Bank.
                            </p>
                        </div>
                        <div className="helpQuestArrow"></div>
                    </>
                )}
            </div>

            <div className="cashBank">
                <div className="patners">
                    <div className="icon">
                        <i className="bi bi-people"></i>
                    </div>
                    <p>Earnings from Partners</p>
                    <div className="valor">
                        <h2>{saldos.parceiros}</h2>
                    </div>
                </div>

                <div className="investiments">
                    <div className="icon">
                        <i className="bi bi-wallet2"></i>
                    </div>
                    <p>Earnings from Investments</p>
                    <div className="valor">
                        <h2>{saldos.invertimentos}</h2>
                    </div>
                </div>

                <div className="total">
                    <div className="icon">
                        <i className="bi bi-currency-dollar"></i>
                    </div>
                    <p>Total Earned</p>
                    <div className="valor">
                        <h2>{saldos.total}</h2>
                    </div>
                </div>

                <div className="card-feacture">
                    <div className="icon">
                        <i className="bi bi-credit-card-2-back-fill"></i>
                    </div>
                    <p>Card Invoice</p>
                    <div className="valor">
                        <h2>{saldos.total}</h2>
                    </div>
                </div>

            </div>

            <div className="anounce">
                <div className="exib-anouce">
                    <img src="../assets/img/background.jpg" alt="anounceNGC" />
                </div>
                <div className="chat-notice">
                        <h3>Ultimas Atualizações</h3>

                </div>
            </div>
        </>
    )
}

export default Dashboard;