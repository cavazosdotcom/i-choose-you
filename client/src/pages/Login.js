import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 container">
      <div className="row">

        <div className="col-md-2 col-xs-0"></div>

        <div className="col-md-8 col-xs-12">
          <h4 className="text-dark p-2 text-center display-4 fw-bold">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              
              <form onSubmit={handleFormSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example1cg">Email:</label>
                  <input 
                    type="text"
                    name="email"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.name}
                    onChange={handleChange}
                  />
                  
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example4cg">Password:</label>
                  <input 
                    type="password"
                    name="password"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.password}
                    onChange={handleChange}
                  />
                  
                </div>
                <div className="d-flex justify-content-center">
                  <button
                  className="btn btn-block btn-dark bg-danger mt-2 shadow"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  >Login</button>
                </div>
                <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/signup" className="fw-bold text-body">Register Here</Link></p>
              </form>

            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-2 col-xs-0"></div>

      </div>
    </main>
  );
};

export default Login;
