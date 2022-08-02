
import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import NewSubjectForm from './NewSubjectForm';
import Subjects from './Subjects';
export const GET_ONE_USER = gql`
  query oneUser ($oneUserId: String!) {
    oneUser(id: $oneUserId) {
      firstName
      subjects {
        id
        name
      }
    }
  }
`;
const PageTwo = () => {
  let params = useParams();
  const navigation = useNavigate();
  console.log(params);
  const [modal, setModal] = useState(false);
   const { client ,error, data, loading } = useQuery(GET_ONE_USER, {
     variables: {
        oneUserId:params.userId,
      //  oneUserId: "9fdd5642-ab49-400a-b9db-2a7eaaafce21",
     },
   });
  return (
    <>
      {modal && <NewSubjectForm setModal={setModal} userId={params.userId} />}
      <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
        <div className="bg-gray-300 col-span-full row-span-1">
          <div className="h-full w-full flex justify-around items-center">
            <div
              className="w-fit px-7 h-[60px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl"
              onClick={() => {
                navigation("/");
              }}
            >
              Home
            </div>
            <div className="text-3xl underline">
              {
                data && data.oneUser && data.oneUser.firstName ? `${data.oneUser.firstName.toUpperCase()
              }'S ACCOUNT`: navigation("/")}
            </div>
            <div className="flex w-fit items-center">
              <div
                className="w-[180px] h-[60px] mr-5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl"
                onClick={() => {
                  setModal(true);
                }}
              >
                Create Subject
              </div>
              <div
                className="w-fit px-7 h-[60px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center cursor-pointer justify-center text-xl"
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
        <div className="row-start-2 row-span-6 col-start-1 col-end-13 flex flex-wrap mx-auto">
          {data &&
            data.oneUser &&
            data.oneUser.subjects &&
            data.oneUser.subjects.map((subject, index) => {
              return (
                <Subjects
                  subject={subject}
                  key={index}
                  userId={params.userId}
                />
              );
            })}
        </div>
        <div className="bg-gray-300 row-span-1 col-span-full flex justify-evenly items-center"></div>
      </div>
    </>
  );
}

export default PageTwo

