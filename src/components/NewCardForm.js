import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_BLOGS = gql`
  mutation create_blog($question: String!, $answer: String!) {
    create_blog(question: $question, answer: $answer) {
      question
      answer
      id
      subjectId
    }
  }
`;

const NewCardForm = ({ setModal, GET_ALL_BLOGS }) => {
  const [input, setInput] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [create_blog, { error, data, loading }] = useMutation(CREATE_BLOGS, {
    refetchQueries: [
      { query: GET_ALL_BLOGS }, // DocumentNode object parsed with gql
      "getAllPaginated", // Query name
    ],
  });
  const handleClick = (event) => {
    event.preventDefault();
    if (!input.question || !input.answer) return;
    create_blog({
      variables: {
        question: input.question,
        answer: input.answer,
      },
    });

    console.log(error);
    console.log(input);
    setInput({
      question: "",
      answer: "",
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50 ">
      <div className="w-1/2 h-2/3 bg-white px-10 py-2 rounded-lg">
        <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
          Create Card
        </div>
        <form className="w-full">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Question
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What is react ?"
              onChange={handleChange}
              name="question"
              value={input.question}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Answer
            </label>
            <textarea
              onChange={handleChange}
              name="answer"
              value={input.answer}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="React is UI frameword for .... ?"
            />
          </div>

          <div className="flex justify-evenly">
            <button
              onClick={handleClick}
              type="submit"
              className=" w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl "
            >
              Submit
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
              className=" w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl "
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCardForm;
