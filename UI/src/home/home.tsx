import { Link } from 'react-router-dom';
import {Button} from "@mui/material";



export default function Home() {


    return (
        <>
            <header>
                <div className="left-block">

                </div>
                <div className="right-block">
                    <Link to="/auth">
                        <Button>Войти</Button>
                    </Link>
                </div>

            </header>
            <h1>Главная страница</h1>
            <p>Добро пожаловать!</p>
        </>
    );
}
