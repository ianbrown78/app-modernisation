import React, { Fragment } from "react";
import NavMenu from './NavMenu';
import { Toaster } from 'react-hot-toast';

export default function Layout(props) {

    return (
        <Fragment>
            <Toaster />
            <NavMenu />
            <div role="main" className="container main">
                {props.children}
            </div>
        </Fragment>
    );
}