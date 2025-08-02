import { useState } from "react";
import '../styles/Settings.css';


const buttons = [
    {icon: 'bi-gear', label: 'config1'},
    {icon: 'bi-gear', label: 'config2'},
    {icon: 'bi-gear', label: 'config3'},
    {icon: 'bi-gear', label: 'config4'},
    {icon: 'bi-gear', label: 'config5'}
]

function Settings () {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <>
            <section className="configTopo">
                <i className="bi bi-gear"></i>
                <h1>Configurações</h1>
            </section>

            <div className='component-config'>
                    <ul className="itens-config">
                        {buttons.map((item, index) => (
                            <li
                                key={index}
                                className={activeIndex === index ? 'active' : ''}
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                            >
                                <span className="hover-glow"></span>
                                <a href='#'>
                                    {item.icon && <i className={`bi ${item.icon}`}></i>}
                                    {item.label && <h4>{item.label}</h4>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
        </>
    )
}

export default Settings;