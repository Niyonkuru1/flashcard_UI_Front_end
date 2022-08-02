import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import CircleLoader from "react-spinners/ClipLoader";
import { GET_ONE_USER } from "./PageTwo";

const DELETE_SUBJECTS = gql`
  mutation delete_subject($deleteSubjectId: String!) {
    delete_subject(id: $deleteSubjectId)
  }
`;
const DeleteSubjectMessage = ({ setModal, idToDelete }) => {
  const [datas, setDatas] = useState(idToDelete)
  console.log(idToDelete)
  const [delete_subject, { error, data, loading }] = useMutation(
    DELETE_SUBJECTS,
    {
      refetchQueries: [
        { query: GET_ONE_USER }, // DocumentNode object parsed with gql
        "oneUser", // Query name
      ],
    }
  );
  // console.log(error.Error);
  const handleClick = (event) => {

    event.preventDefault();
    delete_subject({
      variables: {
        deleteSubjectId:datas,
      },
    });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50">
      <div className="w-1/3 h-2/5 bg-white px-10 py-2 rounded-lg">
        <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
          Create Card
        </div>
        {loading ? ((<div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50"><CircleLoader speedMultiplier={1.5} loading={loading} size={200} className="text-center" /></div>)) : ("")}
        {data && data.delete_subject && (
          <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
            Status: {data.delete_subject}
          </div>
        )}
        {error && error.graphQLErrors && (
          <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
            Error: {error.graphQLErrors[0].message}
          </div>
        )}
        <div className="flex justify-evenly">
          <button
            onClick={handleClick}
            className=" w-[120px] h-[40px] rounded-lg bg-red-300 hover:bg-red-400 text-white flex items-center justify-center text-xl "
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              setModal(false);
            }}
            type="submit"
            className=" w-[120px] h-[40px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-xl "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubjectMessage;
