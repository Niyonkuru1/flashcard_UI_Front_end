import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import Card from "./Card";
import NewSignUpForm from "./NewSignUpForm";
import LoginForm from "./LoginForm";

export const GET_ALL_BLOGS = gql`
  query getAllPaginated($skipping: Int!, $taking: Int!) {
    allBlogs(take: $taking, skip: $skipping) {
      question
      answer
      id
      subjectId
    }
  }
`;


const PageOne = () => {
  const [paginated, setPaginated] = useState(0);
  const { error, data, loading } =
    useQuery
      (GET_ALL_BLOGS,
        {
          variables: {
            skipping: paginated,
            taking: 8,
          },
        });
  const [modal, setModal] = useState(false);
  const [loginModal, setloginModal] = useState(false);
  return (
    <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
      {modal && <NewSignUpForm setModal={setModal} />}
      {loginModal && <LoginForm setModal={setloginModal} />}
      <div className="bg-gray-300 col-span-full row-span-1">
        <div className="h-full w-full flex justify-evenly">
          <div className="flex items-center font-extrabold text-4xl">WELCOME TO THE FLASH CARDS</div>
          <div className="flex w-[400px] justify-evenly items-center">
            <div
              className="w-[120px] h-[40px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl"
              onClick={() => {
                setModal(true);
              }}
            >
              Sign Up
            </div>
            <div
              className="w-[120px] h-[40px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex cursor-pointer items-center justify-center text-xl"
              onClick={() => {
                setloginModal(true);
              }}
            >
              Log In
            </div>
          </div>
        </div>
      </div>

      {loading ? (<div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50"><CircleLoader speedMultiplier={1.5} loading={loading} size={200} className="text-center" /></div>) : (<div className="row-start-2 row-span-6 col-start-2 col-end-13 flex flex-wrap">
        {data &&
          data.allBlogs &&
          data.allBlogs.map((card, index) => {
            return <Card card={card} notLoggedIn={true} key={index} />;
          })}
      </div>)}

      <div className="bg-gray-300 row-span-1 col-span-full flex justify-evenly items-center">
        <div
          className="w-fit p-5 h-[40px] cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-xl"
          onClick={() => {
            setPaginated((prev) => {
              if (prev - 6 < 0) {
                return 0;
              }
              return prev - 6;
            });
          }}
        >
          PREVIOUS CARDS
        </div>
        <div
          className="w-fit p-5 h-[40px] cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-xl"
          onClick={() => {
            setPaginated((prev) => {
              if (data && data?.allBlogs && data.allBlogs.length < 6) {
                return prev + 0;
              }
              return prev + 6;
            });
          }}
        >
          NEXT CARDS
        </div>
      </div>
    </div>
  );
};

export default PageOne;
