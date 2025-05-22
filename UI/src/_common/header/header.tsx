import {Link} from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import {useState} from "react";
import './header.scss'
import './menu.scss'
import {logout} from "@src/auth/slices/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "@src/_redux/store.ts";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import {elastic as Menu} from 'react-burger-menu'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConstructionIcon from '@mui/icons-material/Construction';




export default function Header() {
    const {username, role} = useSelector((state: RootState) => state.auth);
    const [handleOnOpen,setHandleOnOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function exit() {
        setHandleOnOpen(!handleOnOpen);
        dispatch(logout());
        navigate("/");
    }

    function goTo(s: string) {
        setHandleOnOpen(!handleOnOpen);
        navigate(s);
    }

    return (
        <>
            <Menu right isOpen={ handleOnOpen } onOpen={ () => setHandleOnOpen(!handleOnOpen) } onClose={ () => setHandleOnOpen(!handleOnOpen) } >
                {role === 'admin' && <div className="login">{username}</div>}
                <a id="home" className="menu-item" href="/"><Link  onClick={() => goTo('/')} to="/"><HomeIcon/><span>Главная</span></Link></a>
                {role === 'admin' && <a id="home" className="menu-item" onClick={() => goTo('/users')}><Link to="/users"><ManageAccountsIcon/><span>Клиенты</span></Link></a>}
                {role === 'admin' && <a id="home" className="menu-item" onClick={() => goTo('/build-quests')} ><ConstructionIcon/><span>Создание квеста</span></a>}
                {role === 'admin' && <a onClick={exit} className="menu-item--small" href=""><span>Выйти</span></a>}

            </Menu>
            <header>
                <div className="left-block">
                    <div className="logo"><DirectionsRunIcon/><Link to="/">Zoom quests</Link></div>
                </div>
                <div className="right-block">
                    {/*<div className="login">{username}</div>*/}
                    {/*<Button onClick={exit}>Выйти</Button>*/}
                </div>

            </header>
        </>

    )
}
