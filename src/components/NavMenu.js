import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

function NavMenu() {
    return (
        <Navbar container="md">
            <NavbarBrand href="/">Todo App</NavbarBrand>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}
export default NavMenu;