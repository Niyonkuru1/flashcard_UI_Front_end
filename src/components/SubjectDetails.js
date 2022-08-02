import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Card from "./Card"
import CircleLoader from "react-spinners/ClipLoader";
import { useParams, Link, useNavigate } from "react-router-dom";
import NewCardForm from "./NewCardForm";
import { AUTH_TOKEN } from '../constants';
;

export const FETCH_ONE_SUBJECT = gql`
  query oneSubject ($oneSubjectId: String!) {
    oneSubject(id: $oneSubjectId) {
      name
      id
      blogs {
        id
        answer
        question
        subjectId
      }
    }
  }
`;

const SubjectDetails = () => {
    const [modal, setModal ] = useState(false)
  const [loadingTwo, setLoadingTwo] = useState(false)
    const navigation = useNavigate();
  let params = useParams();
  console.log(params)
     const { client, error, data, loading } = useQuery(FETCH_ONE_SUBJECT, {
       variables: {
         oneSubjectId:params.subjectId,
       },
     });
  return (
    <>
  
      {modal && (
        <NewCardForm setModal={setModal} subjectIdTopostOn={params.subjectId} setLoadingTwo = {setLoadingTwo} />
      )}
      {(loading || loadingTwo) ? ((<div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50"><CircleLoader speedMultiplier={1.5} loading={loading} size={200} className="text-center" /></div>)) : ("")}
      <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
        <div className="bg-gray-300 col-span-full row-span-1">
          <div className="h-full w-full flex justify-evenly px-10">
            <div className="flex w-full justify-evenly items-center">
              <div className="w-[15%] h-[60px] px-5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl">
                <Link to={`/user/${params.userId}`}>All Subjects</Link>
              </div>
              
              <div className="w-[30%] px-16 h-[60px] flex items-center cursor-pointer underline justify-center text-4xl">
                <strong>
                  {data && data.oneSubject
                    ? data.oneSubject.name.toUpperCase()
                    : navigation("/")}
                </strong>
              </div>
              <div className="flex w-[25%] justify-between items-center">
                <div
                  className="w-fit h-[60px] px-5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Create Card
                </div>
                <div
                  className="w-fit px-5 h-[60px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl"
                  onClick={() => {
                    localStorage.setItem(AUTH_TOKEN, "");
                     client.resetStore();
                    navigation("/");
                  }}
                >
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-2 row-span-6 col-start-1 col-end-13 flex flex-wrap mx-auto">
          {data &&
            data.oneSubject &&
            data.oneSubject.blogs &&
            data.oneSubject.blogs.map((card, index) => {
              return <Card card={card} key={index} />;
            })}
        </div>
        <div className="bg-gray-300 row-span-1 col-span-full flex justify-evenly items-center"></div>
      </div>{" "}
    </>
  );
}

export default SubjectDetails
