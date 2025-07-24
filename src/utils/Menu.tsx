
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/UtilsStyle/Menu.css';

const Menu = ({ onSelect }: { onSelect: (index: number) => void }) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const menuItens = [
        { icon: 'bi-house-door-fill', label: 'Dashboard' },
        { icon: 'bi-coin', label: 'Investments' },
        { icon: 'bi-front', label: 'Career' },
        { icon: 'bi-wallet-fill', label: 'Wallet' },
        { icon: 'bi-journal-text', label: 'News' },
        { icon: 'bi-person', label: 'Settings' },
        { icon: 'bi-person-raised-hand', label: 'Support' },
    ];

    return(
        <>
            <div className={`menu-home ${activeIndex ? 'active' : ''}`}>
                <div className="logo-menu">
                    <i className="bi bi-bank"></i>
                    <h2>NGC Bank</h2>
                </div>
                <div className='component-menu'>
                    <ul className="itens-menu">
                        {menuItens.map((item, index) => (
                            <li
                                key={index}
                                className={activeIndex === index ? 'active' : ''}
                                onClick={() => {
                                    setActiveIndex(index);
                                    onSelect(index);
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
                <div className="footer-menu">
                    <a href="#" onClick={() => navigate('/')}>
                        <i className="bi bi-box-arrow-right"></i>
                        <h4>Log Out</h4>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Menu;