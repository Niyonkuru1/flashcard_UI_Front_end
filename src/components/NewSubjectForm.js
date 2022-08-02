import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {GET_ONE_USER} from "./PageTwo"

const CREATE_SUBJECTS = gql`
  mutation create_subject($name: String!, $userId: String!) {
    create_subject(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

const NewSubjectForm = ({ setModal, userId }) => {
  const [input, setInput] = useState({
    subject: "",
    userId:userId
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [create_subject, { error, data, loading }] = useMutation(
    CREATE_SUBJECTS,
    {
      refetchQueries: [
        { query: GET_ONE_USER }, // DocumentNode object parsed with gql
        "oneUser", // Query name
      ],
    }
  );
  const handleClick = (event) => {
    event.preventDefault();
    if (!input.subject) return;
    create_subject({
      variables: {
        name: input.subject,
        userId: input.userId,
      },
    });

    console.log(input);
    setInput({
      subject: "",
      userId:""
    });
    setModal(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50 ">
      <div className="w-2/5 h-2/5 bg-white px-10 py-2 rounded-lg">
        <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
          Create Subject
        </div>
        <form className="w-full">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Subject Name
            </label>
            <input
              onChange={handleChange}
              name="subject"
              value={input.subject}
              className="bg-gray-50 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: React, Geography, Rwanda, ... ?"
            />
          </div>

          <div className="flex justify-evenly">
            <button
              onClick={handleClick}
              type="submit"
              className=" w-[120px] h-[40px] rounded-lg bg-gray-400 text-white hover:bg-gray-500 flex items-center justify-center text-xl "
            >
              Create
            </button>
            <button
              onClick={(e) => {
                setInput({
                  question: "",
                  answer: "",
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

export default NewSubjectForm;
