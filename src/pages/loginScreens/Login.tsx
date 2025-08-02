import Help from '../../components/login/Help';
import Forms from '../../components/login/LoginForm';
import '../../styles/loginStyles/Login.css';

function Login() {
    return(
        <div className="container">
            <div className="element">
                <div className="message">
                    <h1>Welcome <span>NGC Bank!</span></h1>

                    <div className="bar"></div>
                    <p>Welcome to NGC Bank, connect and experience a new financial world. <br /><br />
                    Press the button below for more information.</p>

                    <Help />
                </div>

                <div className="forms">
                    { Forms('login') }
                </div>
            </div>
        </div>
    )
}

export default Login;