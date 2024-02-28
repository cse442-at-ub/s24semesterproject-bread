import React, { useEffect, useState } from 'react';
import weyeLogo from './eye_w.webp';

function Header() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-content">
                {/* Frame 17 */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: windowWidth < 550 ? '8%' : '10%',
                    left: '0px',
                    top: '0px',
                    background: '#005BBB'
                }}></div>

                {/* InSight and Logo */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Crimson Text',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: (windowWidth < 550 || windowHeight < 550) ? '25px' : '40px', 
                    lineHeight: '100%',
                    letterSpacing: '-0.01em',
                    color: '#E4E4E4',
                    left: '39px',
                    top: '2%',
                }}>
                    InSight
                    <img src={weyeLogo}  alt="Eye" style={{ marginLeft: windowWidth < 550 ? '5px' : '10px', 
                    height: windowWidth < 550 || windowHeight < 550 ? '30px':(windowWidth < 900 ? '35px' : '40px'),
                    width: windowWidth < 550 || windowHeight < 550 ? '30px':(windowWidth < 900 ? '35px' : '40px'),
                     }} />
                </div>

                {/* Sign Up */}
                <div style={{
                    position: 'absolute',
                    width: windowWidth<600 ? '16%':(windowWidth < 700 ? '14%' : 
                    (windowWidth < 800 ? '12%' : (windowWidth < 900 ? '10%' : '8%'))),
                    height: windowWidth < 550 ? '4.5%' : '6%',//button height
                    right: windowWidth < 800 ? '7%' : (windowWidth < 900 ? '5.5%' : '4%'),
                    top: windowWidth < 800 ? '2.4%' : (windowWidth < 900 ? '2.2%' : '2%'),
                    fontFamily: 'Crimson Text',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    fontSize: (windowWidth < 550 || windowHeight < 550) ? '16px' : '20px',
                    fontWeight: '700',
                    borderRadius: '9.26822px',
                    color: '#000000',
                    textDecoration: 'none'
                }}>
                    Sign Up
                </div>

                {/* Log In */}
                <div style={{
                    position: 'absolute',
                    fontFamily: 'Crimson Text',
                    width: '20%',
                    height: '6%',
                    right: windowWidth<600 ? '20%':(windowWidth < 700 ? '15.5%' : 
                    (windowWidth < 800 ? '12%' : (windowWidth < 900 ? '8%' : '4%'))),
                    top: windowWidth < 550 ? '3%' : '3.5%',
                    color: '#FFFFFF',
                    fontSize: windowWidth < 550 ? '16px' : '20px',
                    fontWeight: '400',
                    textDecoration: 'none',
                }}>Sign In</div>

                 {/* Help */}
                 <div style={{
                    position: 'absolute',
                    fontFamily: 'Crimson Text',
                    width: '20%',
                    height: '6%',
                    right: windowWidth<600 ? '32%':(windowWidth < 700 ? '28%' : 
                    (windowWidth < 800 ? '23.5%' : (windowWidth < 900 ? '18.5%' : '13.5%'))),
                    top: windowWidth < 550 ? '3%' : '3.5%',
                    color: '#FFFFFF',
                    fontSize: windowWidth < 550 ? '16px' : '20px',
                    fontWeight: '400',
                    textDecoration: 'none',
                }}>Help</div>
            </div>
        </header>
    );
}

export default Header;
