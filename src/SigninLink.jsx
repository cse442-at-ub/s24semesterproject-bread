// api.js
//connect with back and frontend
const apiUrl = 'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/login/login.php';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const signIn = async (email, password) => {
  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
        action: 'login',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to sign in. Please try again.');
  }
};

export default signIn;

