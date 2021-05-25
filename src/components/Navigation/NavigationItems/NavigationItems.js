import React, {useContext} from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import AuthContext from '../../../store/auth-context'

const NavigationItems = ( props ) => {

    const authCtx = useContext(AuthContext)
    console.log(authCtx)
    const isLoggedIn = authCtx.isLoggedIn

    const logoutHandler = () => {
        authCtx.logout()
    }

    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        {!isLoggedIn && <NavigationItem link="/login" exact>Log in</NavigationItem>}
        {isLoggedIn && <button className={classes.NavigationItem} onClick={logoutHandler}><a  href="/">Log out</a></button>}
    </ul>)
};

export default NavigationItems;