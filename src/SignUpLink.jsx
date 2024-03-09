// SignUpAPI.jsx
const apiUrl = 'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/register/register.php';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const signUp = async (email, username, password, confirmPassword) => {
  try {
    const response = await fetch(proxyUrl + apiUrl, {
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
      throw new Error('Network response was not ok');
    }

    const responseData = await response.text();
    console.log('Response data:', responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to sign up. Please try again.');
  }
};

export default signUp;
