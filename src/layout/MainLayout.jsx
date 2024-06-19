import React from 'react';
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function MainLayout(props) {
    return (
        <div>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar></Sidebar>
                    <div className="layout-page">
                        <Navbar></Navbar>
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                {props.children}
                            </div>
                            <Footer></Footer>
                            <div className="content-backdrop fade"></div>
                        </div>

                    </div>

                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </div>
    );
}

export default MainLayout;