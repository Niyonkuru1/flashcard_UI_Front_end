import React, { useState } from 'react'
import DeleteMessage from './DeleteCardMessage';
import EditCardForm from './EditCardForm';

const Card = ({ card, notLoggedIn }) => {
  const [flip, setFlip] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const toggleCard = () => {
    setFlip(!flip);
  };
  return (
    <>
      {modal && <EditCardForm setModal={setModal} dataToUpdate={card} />}
      {modalMessage && (
        <DeleteMessage setModal={setModalMessage} idToDelete={card.id} />
      )}
      <div className="w-[260px] ml-3  h-[200px] my-3">
        <div className="w-full h-full bg-gray-200 rounded-lg">
          <div onClick={toggleCard} className="h-[80%] w-full text-xl">
            {!flip ? (
              <div className="bg-gray-700 hover:bg-gray-600 text-yellow-200 px-5 flex h-full justify-center items-center rounded-lg cursor-pointer">
                {card.question}
              </div>
            ) : (
              <div className="bg-gray-400 text-white flex px-5 h-full justify-center items-center rounded-lg cursor-pointer">
                {card.answer}
              </div>
            )}
          </div>
          {notLoggedIn === true ? (
            " "
          ) : (
            <div className="h-[20%] rounded-sm flex justify-between items-center px-3">
              <button
                className="w-[110px] h-[35px] rounded-lg bg-gray-400 hover:bg-gray-500 text-white flex justify-center items-center"
                onClick={() => {
                  setModal(true);
                }}
              >
                Update Card
              </button>
              <button
                className="w-[110px] h-[35px] rounded-lg bg-red-300 hover:bg-red-400 text-white flex justify-center items-center"
                onClick={() => {
                  setModalMessage(true);
                }}
              >
                Delete Card
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card
