import {Link, useLocation} from "react-router";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HomeIcon from '@mui/icons-material/Home';
import React, {useEffect} from "react";
import './header.scss'
import {logout} from "@src/auth/slices/authSlice.ts";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "@src/_redux/store.ts";

enum Pages {
    "" = 0,
    chat = 1,
    search = 2
}

export default function Header() {
    const [page, setPage] = React.useState(Pages[""]);
    const {username} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().pathname.split('/')[1]
    useEffect(() => {
        setPage(Pages[location as keyof typeof Pages])
    })



    function exit() {

        dispatch(logout());
        navigate("/auth");
    }
    return (
        <header>
                    <div className="left-block">
                        <div className="logo"><BeachAccessIcon/><Link to="/">React Chat</Link></div>
                        <BottomNavigation
                            showLabels
                            value={page}
                            onChange={(_event, newPage) => {
                                setPage(newPage);
                            }}
                        >
                            <BottomNavigationAction
                                label="Home"
                                icon={<HomeIcon/>}
                                component={Link}
                                to="/"
                            />
                            <BottomNavigationAction
                                label="Chat"
                                icon={<ChatIcon/>}
                                component={Link}
                                to="/chat"
                            />
                            <BottomNavigationAction
                                label="Search"
                                icon={<SearchIcon/>}
                                component={Link}
                                to="/search"
                            />
                        </BottomNavigation>
                    </div>
            <div className="right-block">
                <div className="login">{username}</div>
                <Button onClick={exit}>Выйти</Button>
            </div>

        </header>
    )
}
