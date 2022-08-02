import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import { GET_ONE_USER } from "./PageTwo";
import { FETCH_ONE_SUBJECT } from "./SubjectDetails";
import { GET_ALL_BLOGS } from "./PageOne";
const CREATE_BLOGS = gql`
  mutation create_blog($question: String!, $answer: String!, $subjectId: String!) {
    create_blog(question: $question, answer: $answer, subjectId: $subjectId) {
      question
      answer
      id
      subjectId
    }
  }
`;

const NewCardForm = ({ setModal, subjectIdTopostOn}) => {
  const [input, setInput] = useState({
    question: "",
    answer: "",
    subjectId: subjectIdTopostOn
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [create_blog, { error, loading }] = useMutation(CREATE_BLOGS, {
    refetchQueries: [
      { query: GET_ONE_USER },
      { query: FETCH_ONE_SUBJECT },
      { query: GET_ALL_BLOGS }, // DocumentNode object parsed with gql
      "getAllPaginated",
      "oneSubject", // DocumentNode object parsed with gql
      "oneUser", // Query name
    ],
  });
  const handleClick = (event) => {
    event.preventDefault();
    if (!input.question || !input.answer) return;
    create_blog({
      variables: {
        question: input.question,
        answer: input.answer,
        subjectId: input.subjectId,
      },
    });

    console.log(error);
    console.log(input);
    setInput({
      question: "",
      answer: "",
    });
     setModal(false)
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50 ">
      <div className="w-1/2 h-2/3 bg-white px-10 py-2 rounded-lg">
        <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
          Create Card
        </div>
        {loading ? ((<div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50"><CircleLoader speedMultiplier={1.5} loading={loading} size={200} className="text-center" /></div>)) : ("")}
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
              className=" w-[120px] h-[40px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-xl "
            >
              Create Card
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

export default NewCardForm;
