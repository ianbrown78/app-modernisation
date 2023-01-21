import React, {Fragment} from "react";
import NavMenu from './NavMenu';

export default function Layout(props) {
    return (
        <Fragment>
            <NavMenu />
            <div role="main" className="container main">
                {props.children}
            </div>
        </Fragment>
    );
}