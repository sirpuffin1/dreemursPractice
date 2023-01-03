import Navbar from "./Navbar";
import React from "react";

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({children}) => {
    return (
        <>
        <Navbar />
        <main>{children}</main>
        </>
    );
}

export default Layout;