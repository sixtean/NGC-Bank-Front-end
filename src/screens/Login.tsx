import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import '../styles/Login.css';
import checkedAnimation from '../animations/checked/Tick animation - success feedback.json'
import 'bootstrap-icons/font/bootstrap-icons.css';


function Login() {
    const navigate = useNavigate();
    const [formType, setFormType] = useState('login');
    const [transitioningForm, setTransitioningForm] = useState(false);
    const [learnButton, setLearnButton] = useState(false);
    const [learnAnimState, setLearnAnimState] = useState('');
    const [notifyAPI, setNotifyAPI] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [initDados, setInitDados] = useState(false);
    const [checkedButton, setCheckedButton] = useState(false);
    const [dados, setDados] = useState(false);

    const switchForm = (type: string) => {
        if (type === formType) return;

        setTransitioningForm(true);
        setTimeout(() => {
            setFormType(type);
            setTransitioningForm(false);
        }, 300);
    };

    const [formData, setFormData] = useState({
        email: '',
        senha: '',
        confirmSenha: '',
        nome: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
                ...prev,
                [name]: value,
        }));
    }

    const handleButonLearn = (show: boolean) => {
        if (show) {
            setLearnButton(true);
            setLearnAnimState('open');
        } else {
            setLearnAnimState('exit');
            setTimeout(() => {
                setLearnButton(false);
                setLearnAnimState('');
            }, 500);
        }
    }

    const handleName = () => {
        setInitDados(true);
    }

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        handleName();

        try{
            const dados = {
                email: formData.email,
                senha: formData.senha,
                confirmSenha: formData.confirmSenha,
                nome: formData.nome,
                verificar: true
            };

            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const data = await response.json();
            
            if (!response.ok) {
                setApiMessage(data.error || 'Erro inesperado');
                setNotifyAPI(true)
                return;
            }

            if (response.ok) {
                if(data.token) {
                    localStorage.setItem('token', data.token);
                }
                if(data.dados) {
                    setInitDados(true);
                    setDados(true);
                    setCheckedButton(true);

                    setTimeout(() => {
                        setInitDados(false);
                        setDados(false);
                        setCheckedButton(false);
                    }, 2500);
        
                    return;
                }
                if(data.verificado) {
                    setTimeout(() => {
                        navigate('/home');
                    }, 500);
                }
                setNotifyAPI(true);
                setApiMessage(data.message);
            } else {
                setApiMessage(data.error);
            }
            setNotifyAPI(false);
            setApiMessage('');

        } catch (err) {
            console.log("Erro", err)
        }
    }


    return (
        <div className="container-login">
            {initDados && (
                <>
                    <div className="container-dados">
                        <div className="border">
                        <div className="animacao">
                            {dados && (
                                <>
                                    {checkedButton ? (
                                        <Lottie
                                            animationData={checkedAnimation}
                                            loop={false}
                                            style={{ height: 320, width: 320 }}
                                        />
                                        ) : (
                                        ''
                                    )}
                                </>
                            )}
                        </div>
                            <h1>Dados!</h1>
                            <p>Aqui pedimos os seus dados para fins de segurança e melhor uso do sistema bancario.
                            <br /><br />
                            Garantimos a segurança e proteção total dos seus dados contra ataques e fraudes, caso necessite de alguma ajuda ou mais informações, entre em contato com o nosso suporte no telefone para contato - <strong>(33)99941-1331</strong>. <br /><br />
                            Por meio desse contato você pode sanar suas duvidas e relatar bugs no sistema ou alguma falha! A equipe NGC agradece...
                            </p>

                            <form className='formInput' onSubmit={handleRegister}>
                                <div className='input-name'>
                                    <input
                                        type="text"
                                        name='nome'
                                        placeholder=" "
                                        id="nome-input"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        className='inputs-name'
                                        required
                                    />
                                    <label htmlFor='nome-input' className='label-name'>Nome</label>
                                </div>

                                <button
                                    type='submit'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        height: '35px',
                                        width: '35px',
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                        position: 'absolute',
                                        marginTop: '45.3%',
                                        marginLeft: '80%',
                                    }}
                                >
                                        {dados ? (
                                            <i className="bi bi-patch-check-fill" style={{
                                                fontSize: 34,
                                                marginLeft: '-6px',
                                                color: 'green',
                                            }} ></i>
                                        ) :  (
                                            <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: 34 }} />
                                            
                                        )}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            { notifyAPI && (
                <>
                    <div className="APIMessage-container">
                        <a href=""><i className="bi bi-x-lg"></i></a>
                        <h3>{apiMessage}</h3>
                    </div>
                </>
            )}
            { learnButton && (
                <>
                    <div className={`learnContainer-login ${learnAnimState}`}>
                        <a href="#" id="closeLearn-login" onClick={() => handleButonLearn(false)}><i className="bi bi-x-lg"></i></a>
                    
                        <h1>Hello friend</h1>
                        <p>We are an innovative bank expanding in the market, we come with the best technologies and the lowest rates on the market! <br /><br />
                        
                        We have AI chats and a powerful support team to help you with everything you need, from transactions to international purchases, whether NGC Cash <br /><br />

                        We have personalized cards with the most innovative and charming designers ever seen in all of Brazil. Order and track yours in real time, follow step by step, from creation to activation of your card.
                        </p>
                    
                    </div>
                </>
            )}

            <div className="login">

                <div className="logo">
                <i className="bi bi-bank2"></i>
                </div>

                <h1 id='titulo-login'>Welcome!</h1>

                <div className="line"></div>

                <div className="text-login">
                    <h4>Welcome to NGC Bank! Looking for financial independence? Create your account and start your new journey.</h4>
                </div>

                <button id='learnMore-login' onClick={() => handleButonLearn(true)}>Learn More</button>

                <div className={`login-dados ${formType === 'create' ? 'expand' : ''}`}>
                    <div className={`form-container ${transitioningForm ? 'fade-out' : 'fade-in'}`}>
                        {formType === 'login' && (
                            <>
                                <h2>Sign In</h2>
                                <form className='formInput form-animation'>

                                    <div className='input-group'>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder=" "
                                            id="email-input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='inputs'
                                            required
                                        />
                                        <label htmlFor='email-input' className='label'>Email</label>
                                    </div>

                                    <div className='input-group'>
                                        <input
                                            type="password"
                                            name="senha"
                                            placeholder=" "
                                            id="password-input"
                                            value={formData.senha}
                                            onChange={handleChange}
                                            className='inputs'
                                            required
                                        />
                                        <label htmlFor='password-input' className='label'>Password</label>
                                    </div>
                                    <button type='submit' id='submit-login'>Submit</button>

                                    <a href="#" onClick={() => switchForm('create')} id='createAcount-login'><p>Create Acount</p></a>
                                </form>
                            </>
                        )}

                        { formType === 'create' && (
                            <>
                                <h2>Create Account</h2>
                                <form className='formInput form-animation' onSubmit={handleRegister}>

                                    <div className='input-group'>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder=" "
                                            id="email-input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='inputs'
                                            required
                                        />
                                        <label htmlFor='email-input' className='label'>Email</label>
                                    </div>

                                    <div className='input-group'>
                                        <input
                                            type="password"
                                            name="senha"
                                            placeholder=" "
                                            id="password-input"
                                            value={formData.senha}
                                            onChange={handleChange}
                                            className='inputs'
                                            required
                                        />
                                        <label htmlFor='password-input' className='label'>Password</label>
                                    </div>

                                    <div className='input-group'>
                                        <input
                                            type="password"
                                            name="confirmSenha"
                                            placeholder=" "
                                            id="password-confirm-input"
                                            value={formData.confirmSenha}
                                            onChange={handleChange}
                                            className='inputs'
                                            required
                                        />
                                        <label htmlFor='password-confirm-input' className='label confirmPasswordLabel'>Confirm Password</label>
                                    </div>
                                    <button type='submit' id='submit-login'>Submit</button>

                                    <a href="#" onClick={() => switchForm('login')} id='createAcount-login'><p>Login</p></a>
                                </form>  
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;