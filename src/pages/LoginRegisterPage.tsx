import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setProfile, setUserCredentials} from "../store/actions";
import {ILogin} from "../store/types";
import ApiService from "../services/ApiService";
import apiService from "../services/ApiService";
import Navbar from "../components/Navbar";
export interface IUser {
  user: {
    bio: string;
    email: string;
    image: string;
    token: string | null;
    username: string | null;
  }
}
export default function LoginRegisterPage() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const login = async (): Promise<IUser | undefined> => {
      try {
        const userCredentials: ILogin = {
          user: {
            ...formData
          }
        };
        return await ApiService.login(userCredentials);
      } catch (error) {
        console.error('api error', error)
      }
    }

    login().then((res) => {
      if (res) {
         navigate("/");
      }
    })

  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
