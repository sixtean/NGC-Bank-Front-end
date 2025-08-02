import React, { useState } from "react";
import axios from "axios";

import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Input = styled.input`
  border-radius: 10px;
  height: 50px;
  width: 90%;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid gray;
  padding: 30px 0px;
  color: #fff;
  padding-left: 30px;

  &::placeholder {
    color: #888;
    font-style: italic;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid purple;
  }
`;

const Button = styled.button`
    border: none;
    height: 50px;
    width: 50%;
    border-radius: 50px;
    margin-top: 10%;
    transition: .4s;

    &:hover {
        background-color: purple;
        color: white;
        cursor: pointer;
    }
`

const A = styled.a`
    display: flex;
    margin-top: 10%;
    margin-left: 65%;
    color: white;
    text-decoration: none;
    transition: .4s;

    &:hover {
        color: purple;
        font-size: 17px
    }
`

const P = styled.p`
    color: red;
    width: 60%;
    height: auto;
    margin-top: -5%;
    font-size: 15px;
    overflow-wrap: break-word;
    pointer-events: none;

`

function Forms (forms: string) {
    const navigate = useNavigate();
    const [typeInput, setTypeInput] = useState(forms)
    const [apiMessage, setApiMessages] = useState('')
    const [dados, setDados] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/user/login',
                {
                    email: dados.email,
                    password: dados.password
                }
            );
            const data = response.data;
            
            if(data.verify) {
                setTimeout(() => {
                    navigate('/home');
                }, 500)
            }

            if(!data.verify) {
                setApiMessages('verify your account to continue!')
            }
        } catch (error: any) {
            if(error.response) {
                setApiMessages(error.response.data.error);
            }
        };
    }

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <>
            {typeInput === 'login' && (
                <>
                    <h1
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            marginTop: '32%',
                            fontSize: '44px'
                        }}
                    >
                        LOGIN
                    </h1>
                    <form
                        onSubmit={handleLogin}
                        style={{
                            textAlign: 'center',
                            width: '70%',
                            height: '60%',
                            padding: '2rem',
                            marginLeft: '15%',
                            marginTop: '2%',
                            borderRadius: '10px',
                        }}
                    >
                        <Input
                            type="email"
                            name="email"
                            value={dados.email}
                            onChange={(e) => setDados({ ...dados, [e.target.name]: e.target.value })}
                            placeholder="Email"
                            
                            
                            required
                        />

                        <Input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={dados.password}
                            onChange={(e) => setDados({ ...dados, [e.target.name]: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                        >
                            LOGIN
                        </Button>

                        <A href="#" onClick={() => setTypeInput('register')}>
                            Create Account
                        </A>

                        <P>
                            {apiMessage}
                        </P>
                        
                    </form>
                </>
            )}

            {typeInput === 'register' && (
                <>
                    <h1
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            marginTop: '32%',
                            fontSize: '44px'
                        }}
                    >
                        REGISTER
                    </h1>
                    <form
                        onSubmit={handleRegister}
                        style={{
                            textAlign: 'center',
                            width: '70%',
                            height: '60%',
                            padding: '2rem',
                            marginLeft: '15%',
                            marginTop: '2%',
                            borderRadius: '10px',
                        }}
                    >
                        <Input
                            type="email"
                            name="email"
                            value={dados.email}
                            onChange={(e) => setDados({ ...dados, [e.target.name]: e.target.value })}
                            placeholder="Email"
                            
                            
                            required
                        />

                        <Input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={dados.password}
                            onChange={(e) => setDados({ ...dados, [e.target.name]: e.target.value })}
                            required
                        />

                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={dados.confirmPassword}
                            onChange={(e) => setDados({ ...dados, [e.target.name]: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                        >
                            REGISTER
                        </Button>

                        <A href="#" onClick={() => setTypeInput('login')} style={{ marginLeft: '80%'}}>
                            Login
                        </A>

                        <P>
                            {apiMessage}
                        </P>
                        
                    </form>
                </>
            )}
        </>
    )
}

export default Forms;