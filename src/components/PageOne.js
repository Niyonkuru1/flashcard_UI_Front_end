import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Card from "./Card";
import NewCardForm from "./NewCardForm";

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
  const [getAllData, {error, data, loading }] =
    useLazyQuery
    (GET_ALL_BLOGS,
    {
      variables: {
        skipping: paginated,
        taking: 6,
      },
    });
  console.log(data?.allBlogs);
  const [modal, setModal] = useState(false);
  return (
    <div className="grid grid-cols-12 grid-rows-8 bg-slate-400 h-full w-full">
      {modal && (
        <NewCardForm setModal={setModal} GET_ALL_BLOGS={GET_ALL_BLOGS} />
      )}
      <div className="bg-red-300 col-span-full row-span-1">
        <div className="h-full w-full flex justify-end">
          <div className="flex w-[400px] justify-evenly items-center">
            <div
              className="w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center cursor-pointer justify-center text-xl"
              onClick={() => {
                setModal(true);
              }}
            >
              Create card
            </div>
            <div className="w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl">
              Register
            </div>
            <div className="w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl">
              Login
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-300 row-start-2 row-span-6 col-start-3 col-end-13 flex flex-wrap mx-auto">
        {data &&
          data.allBlogs &&
          data.allBlogs.map((card) => {
            return <Card card={card} />;
          })}
      </div>
      <div className="bg-gray-300 row-start-2 row-span-6 col-start-1 col-end-3 overflow-y-auto">
        <div className="mb-3 font-semibold text-[16px] w-full ">Subject</div>
        <div className="text-md mb-3">
          <button
            className="w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl  cursor-pointer"
            onClick={() => {
              getAllData();
            }}
          >
            Fetch All
          </button>
        </div>
      </div>
      <div className="bg-yellow-300 row-span-1 col-span-full flex justify-evenly items-center">
        <div
          className="w-[120px] h-[40px] cursor-pointer rounded-lg bg-green-300 flex items-center justify-center text-xl"
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
          className="w-[120px] h-[40px] cursor-pointer rounded-lg bg-green-300 flex items-center justify-center text-xl"
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
