import { useEffect } from 'react';
import './Header.css';

function Header() {
    useEffect(() => {
        const links = document.querySelectorAll(
            '.site-header a[href^="#"]'
        );

        function handleNavClick(event) {
            event.preventDefault();

            const targetId = event.currentTarget
                .getAttribute('href')
                .substring(1);

            const target = document.getElementById(targetId);

            if (!target) return;

            target.scrollIntoView({
                behavior: 'smooth',
            });

            window.history.replaceState(
                null,
                '',
                window.location.pathname + window.location.search
            );
        }

        links.forEach((link) => {
            link.addEventListener('click', handleNavClick);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener('click', handleNavClick);
            });
        };
    }, []);

    return (
        <header className="site-header">
            <div className="in-header">
                <a href="#top" className="site-logo">
                    MY LIBRARY
                </a>

                <nav className="site-nav">
                    <a href="#discover">DISCOVER</a>
                    <a href="#library">LIBRARY</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;