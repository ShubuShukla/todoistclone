import React from "react";
import logo from "D:/shubu with newton/react projects/todoistclone/src/components/assets/image/logo.png"

const Header = () => {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <img src={logo} alt="ToDolist" ></img>
                </div>
            </nav>

        </header>
    )
}

export default Header
