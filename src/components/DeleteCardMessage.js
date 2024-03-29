import { gql, useMutation } from '@apollo/client';
import React from 'react'
import { GET_ALL_BLOGS } from './PageOne';
import { FETCH_ONE_SUBJECT } from './SubjectDetails';


const DELETE_BLOGS = gql`
  mutation delete_blog($deleteBlogId: String!) {
    delete_blog(id: $deleteBlogId)
  }
`;
const DeleteMessage = ({  setModal, idToDelete }) => {
  const [delete_blog, { error, data, loading }] = useMutation(DELETE_BLOGS, {
    refetchQueries: [
      { query: FETCH_ONE_SUBJECT },
      { query: GET_ALL_BLOGS }, // DocumentNode object parsed with gql
      "getAllPaginated",
      "oneSubject" // Query name
    ],
  });
  const handleClick = (event) => {
    event.preventDefault();
    delete_blog({
      variables: {
        deleteBlogId: idToDelete,
      },
    });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-50">
      <div className="w-1/3 h-1/3 bg-white px-10 py-2 rounded-lg">
        <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
          Are you sure you want to delete a Card ?
        </div>
        {data && data.delete_blog ? (
          <div className="mb-4 font-bold border-b-2 border-solid border-darkBluePhant w-full pt-2">
            STATUS: {data.delete_blog}
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-evenly">
          <button
            onClick={handleClick}
            type="submit"
            className=" w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl "
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              setModal(false);
            }}
            type="submit"
            className=" w-[120px] h-[40px] rounded-lg bg-green-300 flex items-center justify-center text-xl "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage
