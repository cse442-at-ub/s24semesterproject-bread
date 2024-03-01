import React from 'react';
import weyeLogo from './eye_w.webp';

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                {/* Frame 17 */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '10%',
                    left: '0px',
                    top: '0px',
                    background: '#005BBB'
                }}></div>

                {/* InSight */}
                <div style={{
                    position: 'absolute',
                    width: '160.16px',
                    height: '80.42px',
                    left: '39px',
                    top: '-5px',
                    fontFamily: 'Crimson Text',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '40px',
                    lineHeight: '100%',
                    letterSpacing: '-0.01em',
                    color: '#E4E4E4'

   
                }}>
                    InSight
                    <img src={weyeLogo}   alt="Eye" style={{ marginLeft: '10px', height: '40px', width: '40px' }} />
                </div>


                {/* Sign Up */}
                <a href="/signuppage/" style={{
                    position: 'absolute',
                    width: '8%',
                    height: '6%',
                    right: '3%',
                    top: '2%',
                    fontFamily: 'Crimson Text',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: '700',
                    borderRadius: '9.26822px',
                    color: '#000000',
                    textDecoration: 'none'
                }}>
                    <button style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0',
                        margin: '0',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        fontWeight: 'inherit',
                        color: 'inherit',
                        cursor: 'pointer'
                    }}>Sign Up</button>
                </a>

                {/* Sign Up */}
                <a href="/signuppage" style={{
                    position: 'absolute',
                    fontFamily: 'Crimson Text',
                    width: '8%',
                    height: '6%',
                    right: '13%',
                    top: '3.5%',
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: '400',
                    textDecoration: 'none',
                }}>Log In</a>

                 {/* Sign In */}
                 
                 <a style={{
                    position: 'absolute',
                    fontFamily: 'Crimson Text',
                    width: '8%',
                    height: '6%',
                    right: '20%',
                    top: '3.5%',
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: '400',
                    textDecoration: 'none',
                }}>Help</a>
            </div>
        </header>
    );
}

export default Header;
