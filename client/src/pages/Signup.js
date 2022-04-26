import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import Footer from '../components/Footer';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <main className="flex-row justify-center mb-4 container">
      <div className="row">

        <div className="col-md-2 col-xs-0"></div>

        <div className="col-md-8 col-xs-12">
          <h4 className="text-dark p-2 text-center display-4 fw-bold">Become a Trainer!</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              
              <form onSubmit={handleFormSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example1cg">UserName:</label>
                  <input 
                    type="text"
                    name="username"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.name}
                    onChange={handleChange}
                  />
                  
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example3cg">Email:</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.email}
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
                  >Start Training!</button>
                </div>
                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/">Login Here</Link></p>
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
    <Footer />
    </>
  );
};

export default Signup;
