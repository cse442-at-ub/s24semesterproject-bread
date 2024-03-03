// authHelpers.js

// Function to handle email change
export const handleEmailChange = (email, setEmail) => {
  setEmail(email);
};

// Function to handle password change
export const handlePasswordChange = (password, setPassword) => {
  setPassword(password);
};

// Function to handle sign in
export const handleSignIn = async (email, password, signIn) => {
  try {
      // Check if email ends with 'buffalo.edu'
      if (email.endsWith('buffalo.edu')) {
          const data = await signIn(email, password);
          // If sign in is successful, redirect to the homepage
          if (data.username && data.sessionID && data.userID) {
              window.location.href = "https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Homepage/";
          } else {
              // If sign in fails, show error message
              alert('Please check your email and password');
          }
      } else {
          // If email doesn't end with 'buffalo.edu', show error message
          alert('Please use a buffalo.edu email address to sign in');
      }
  } catch (error) {
      // If an error occurs during sign in, show error message
      alert(error.message);
  }
};
