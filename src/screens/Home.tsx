
import { useState} from 'react';
import Menu from '../utils/Menu';
import { useTheme } from '../utils/ThemeContext';
import '../styles/Home.css';

/* Telas */
import Dashboard from './Dashboard';

function Home () {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { lightTheme } = useTheme();

    const screens = [
        <Dashboard />,
    ]

    return (
        <div className={`container-home ${lightTheme ? 'light' : ''}`}>
            <Menu  onSelect={setActiveIndex} />
            <div className="screen-container">
                {screens[activeIndex]}
            </div>
        </div>
    )
}
export default Home;