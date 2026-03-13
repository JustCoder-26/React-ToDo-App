import React, { useEffect, useState } from "react";

const ListItems = () => {
  const todoKey = "todoKey"
  const [List, setList] = useState("");
  const [Task, setTask] = useState(()=>{
    const todoStore = localStorage.getItem(todoKey)
    if(!todoStore) return[]
    return JSON.parse(todoStore)
  });

  const submitHandler = () => {
    if (!List) return;
    const copytask = [...Task];
    copytask.push(List);
    setTask(copytask);
    setList("");
  };

  const deleteHandler = (idx)=>{
    const copytask = [...Task]
    copytask.splice(idx,1)
    setTask(copytask)
  }

  useEffect(()=>{
    localStorage.setItem("todoKey" , JSON.stringify(Task))
  })

  return (
    <div className="h-[90%] w-full flex  items-center flex-col ">
      <div className="w-full flex justify-center my-5 items-start gap-3">
        <input
          value={List}
          onChange={(e) => {
            setList(e.target.value);
          }}
          type="text"
          placeholder="Enter Your Task Here"
          className="bg-gray-950 w-3/4 h-15 text-white px-5 my-5 rounded-md text-xl outline-0"
        />
        <button
          onClick={submitHandler}
          className="h-12 w-20 my-6 rounded-md bg-green-700 text-white cursor-pointer text-xl"
        >
          Add
        </button>
      </div>

      {Task.map((elem,idx) => {
        return (
          <div key={idx} className=" h-15 flex justify-between items-center w-3/4  bg-gray-800 text-white text-xl px-5 rounded-md my-3">
            <p>{elem}</p>
            <button 
            onClick={()=>{
                deleteHandler(idx)
            }}
            className="bg-red-600 cursor-pointer w-20 h-8 rounded-md text-lg font-bold ">
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListItems;
