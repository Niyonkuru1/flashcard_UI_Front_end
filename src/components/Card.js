import React, { useState } from 'react'
import DeleteMessage from './DeleteMessage';
import EditCardForm from './EditCardForm';

const Card = ({card}) => {
  const [flip, setFlip] = useState(false);
  const [ modal, setModal ] = useState(false);
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
        <div className="w-full h-full">
          <div onClick={toggleCard} className="h-[80%] w-full">
            {!flip ? (
              <div className="bg-yellow-200 flex h-full justify-center items-center rounded-2xl cursor-pointer">
                {card.question}
              </div>
            ) : (
              <div className="bg-green-200 flex h-full justify-center items-center rounded-2xl cursor-pointer">
                {card.answer}
              </div>
            )}
          </div>
          <div className="h-[20%] rounded-sm flex justify-between items-center px-3">
            <button
              className="w-[110px] h-[35px] rounded-lg bg-violet-400 flex justify-center items-center"
              onClick={() => {
                setModal(true);
              }}
            >
              Update Card
            </button>
            <button className="w-[110px] h-[35px] rounded-lg bg-violet-400 flex justify-center items-center"
            onClick={() => {
              setModalMessage(true);
            }}>
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card
