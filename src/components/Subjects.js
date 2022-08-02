import React, { useState } from "react";
import DeleteSubjectMessage from "./DeleteSubjectMessage";
import NewCardForm from "./NewCardForm";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

export const FETCH_ONE_SUBJECT = gql`
  query oneSubject($oneSubjectId: String!) {
    oneSubject(id: $oneSubjectId) {
      blogs {
        answer
      }
    }
  }
`;

const Subjects = ({ subject, userId }) => {
  let navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const { error, data, loading } = useQuery(FETCH_ONE_SUBJECT, {
    variables: {
      oneSubjectId: subject.id,
    },
  });
  return (
    <>
      {cardModal && (
        <NewCardForm setModal={setCardModal} subjectIdTopostOn={subject.id} />
      )}
      {modalMessage && (
        <DeleteSubjectMessage
          setModal={setModalMessage}
          idToDelete={subject.id}
        />
      )}
      <div className="w-[260px] ml-3  h-[200px] my-3">
        <div className="w-full h-full">
          <div className="h-[80%] w-full">
            <>
              <div
                className="bg-gray-600 hover:bg-gray-500 flex h-[80%] justify-center items-center text-4xl text-yellow-50 rounded-t-2xl cursor-pointer"
                onClick={() => {
                  navigate(`/subjects/${userId}/${subject.id}`);
                }}
              >
                {subject.name}
              </div>
              <div className="h-[20%] flex justify-center bg-gray-400">
                Contains -{" "}
                <b>
                  {data &&
                    data.oneSubject &&
                    data.oneSubject.blogs &&
                    data.oneSubject.blogs.length}
                </b>{" "}
                - CARDS
              </div>
            </>
          </div>
          <div className="h-[20%] rounded-sm flex justify-between items-center px-3">
            <button
              className="w-[110px] h-[35px] rounded-lg text-white bg-gray-400 hover:bg-gray-500 flex justify-center items-center"
              onClick={() => {
                setCardModal(true);
              }}
            >
              Add card
            </button>
            <button
              className="w-[120px] h-[35px] rounded-lg bg-red-300 hover:bg-red-400 flex justify-center items-center"
              onClick={() => {
                setModalMessage(true);
              }}
            >
              Delete subject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjects;
