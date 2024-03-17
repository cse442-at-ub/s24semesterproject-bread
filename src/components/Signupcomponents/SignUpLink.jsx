// SignUpAPI.jsx
const apiUrl = 'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/register/register.php';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const signUp = async (email, username, password, confirmPassword) => {
  try {
    //locally:
    const response = await fetch(proxyUrl + apiUrl, {
      //server:
    //const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        action: 'register',
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log('Response data:', responseData);
      throw new Error(String(responseData.message));
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error.message);
  }
};

export default signUp;