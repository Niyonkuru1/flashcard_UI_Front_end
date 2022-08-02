import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";

const LOGIN_USER = gql`
  mutation login_user(
    $email: String!
    $password: String!
  ) {
    login_user(
      email: $email
      password: $password
    ) {
      token
      user {
        firstName
        secondName
      }
    }
  }
`;

const LoginForm = ({ setModal }) => {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [login_user] = useMutation(LOGIN_USER, {
    variables: {
      email: input.email,
      password: input.password,
    },
    onCompleted: ({ login_user }) => {
      localStorage.setItem(AUTH_TOKEN, login_user.token);
      const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));
      console.log(userIdFetched);
      navigate(`user/${userIdFetched.userId}`);
    },
    onError: (errors) => {
      console.log(errors[0].message);
      navigate("/");
    },
  });

  const handleClick = (event) => {
    event.preventDefault();
    if (!input.email || !input.password) return;
    login_user();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50 ">
      <div className="w-1/2 h-2/4 bg-white px-10 py-2 rounded-lg">
        <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
          Login into Account
        </div>
        <form className="w-full">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email "
              type="email"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              name="password"
              value={input.password}
            />
          </div>

          <div className="flex justify-evenly">
            <button
              onClick={handleClick}
              type="submit"
              className=" w-[120px] h-[40px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-xl "
            >
              Log In
            </button>
            <button
              onClick={(e) => {
                setInput({
                  email: "",
                  password: "",
                });
                setModal(false);
              }}
              type="submit"
              className=" w-[120px] h-[40px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-xl "
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
