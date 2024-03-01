// authHelpers.js
//reject email function
export const handleEmailChange = (email, setEmail) => {
    setEmail(email);
  };
  
  export const handlePasswordChange = (password, setPassword) => {
    setPassword(password);
  };
  
  export const handleSignIn = async (email, password, signIn, setErrorMessage) => {
    try {
      if (email.endsWith('buffalo.edu')) {
        const data = await signIn(email, password);
        if (data.username && data.sessionID && data.userID) {
          window.location.href = "https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Homepage/";
        } else {
          setErrorMessage('Please check your email and password');
        }
      } else {
        setErrorMessage('Please use a buffalo.edu email address to sign in');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  