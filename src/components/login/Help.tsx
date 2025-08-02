import { useState } from "react";

function Help() {
    const [active, setActive] = useState(false);

    const handleHelp = (status: boolean) => {
        setActive(status);
    }


    return (
        <>
            <button
                onClick={() => handleHelp(true)}
                style={{
                    height: '10%',
                    width: '70%',
                    marginLeft: '4%',
                    marginTop: '35%',
                    borderRadius: '40px',
                    backgroundColor: 'rgb(148, 1, 148)',
                    textAlign: 'start',
                    color: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '.5rem',

                }}    
            >
                <h1
                    style={{
                        fontSize: '22px',
                        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                        marginLeft: '1rem'
                    }}
                >
                    HELP-ME
                </h1>
                <div
                    style={{
                        backgroundColor: '#ffffffb6',
                        borderRadius: '50%',
                        width: '55px',
                        height: '55px',
                        display: 'flex',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <span
                        style={{
                            fontSize: '30px',
                            marginTop: '22%',
                            marginLeft: '22%',
                            color: 'black'
                        }}
                    >
                        <i className="bi bi-arrow-right"></i>
                    </span>
                </div>
            </button>

            {active && (
                <div
                    style={{
                        width: '70%',
                        height: '95.2%',
                        marginTop: '-38%',
                        marginLeft: '-2%',
                        backgroundColor: '#fffefc',
                        color: 'black',
                        borderRadius: '10px 10px 0px 0px',
                        padding: '2rem',
                        textAlign: 'center',
                        position: 'absolute',
                        zIndex: '1000000',
                    }}
                >
                    <button
                        onClick={() => handleHelp(false)}
                        style={{
                            position: 'fixed',
                            color:'red',
                            width: '3%',
                            height: '5%',
                            marginLeft: '31.5%',
                            marginTop: '-1%',
                            fontSize: '26px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <h1
                        style={{
                            fontSize: '80px',
                            color: 'purple',
                            fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                            pointerEvents: 'none',
                        }}
                    >
                        NGC Bank
                    </h1>

                    <p
                        style={{
                            textAlign: 'start',
                            fontSize: '20px',
                            marginTop: '5%',
                            marginLeft: '3%',
                            fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                            
                        }}
                    >
                        A NGC Bank é uma empresa focada no mundo financeiro, cuidamos do seu dinheiro da melhor forma possivel, invista e desfrute o melhor do mundo dos negocios. <br /> <br />

                        Com cartões com limites apartir de <span style={{color:'purple'}}>U$500</span> com grade maxima de ate <span style={{color:'purple'}}>U$2.000.000</span> para vocẽ gastar com oque quiser. <br /><br />

                        Proximas Atualizações...
                    </p>

                </div>
            )}
        </>
    )
}

export default Help;