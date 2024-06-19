import React from 'react';

function Footer() {
    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl  text-center py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0 text-center">
                    ©   {new Date().getFullYear() }
                    , made with ❤️ by <a href="https://themeselection.com" target="_blank"
                       className="footer-link fw-bolder">Mohsin Javaid</a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;