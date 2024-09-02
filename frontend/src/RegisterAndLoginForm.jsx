import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <form className="w-80 p-8 bg-gray-800 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-white text-3xl font-semibold mb-4 text-center">
          {isLoginOrRegister === 'register' ? 'Sign Up' : 'Sign In'}
        </h2>
        <input
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition duration-300">
          {isLoginOrRegister === 'register' ? 'Sign Up' : 'Sign In'}
        </button>
        <div className="text-center mt-4 text-gray-500">
          {isLoginOrRegister === 'register' ? (
            <div>
              Already a member?
              <button
                className="text-red-500 ml-1 underline hover:text-red-700"
                onClick={() => setIsLoginOrRegister('login')}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div>
              Don't have an account?
              <button
                className="text-red-500 ml-1 underline hover:text-red-700"
                onClick={() => setIsLoginOrRegister('register')}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
