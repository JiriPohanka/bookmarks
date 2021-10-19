import { NavLink } from 'react-router-dom'
import { Switch } from '@mui/material'
import navItems from './navItems'
import "./Header.css"

const Header = (props) => {
    const setAutoSubmit = props.setAutoSubmit
    const autoSubmit = props.autoSubmit

    function handleToggle() {
        setAutoSubmit(!autoSubmit)
    }

    return (
        <header>
            <nav>
                <ul>
                    {navItems.map((item, index) =>
                        <li key={index}>
                            <NavLink className={item.cName} activeClassName="is-active" to={item.link}>{item.title}</NavLink>
                        </li>)}
                </ul>
            </nav>
            <div className="autosubmit-wrap">
                <span>autosubmit</span>
                <Switch onChange={handleToggle} />
            </div>
        </header>
    )
}

export default Header
