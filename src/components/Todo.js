import "../App.css";
import React, { useState, useEffect } from 'react';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

//Add own firebase config 

const firebaseConfig = {

  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



const Todo = () =>{



    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [btnState, setBtnState] = useState(false);



    //CREATE

        const addTodo = async (e) => {
            e.preventDefault()
        
            try{
                const docRef = await addDoc(collection(db, "todos"), {todo:todo,})
                console.log("Document written with ID: ", docRef.id)
            }catch (e) {
                console.error("Error adding document", e) 
                }
        }                                                                  



    //READ

        const fetchPost = async () =>{
            await getDocs(collection(db, "todos" )).then((QuerySnapshot) =>{
                const newData = QuerySnapshot.docs.map((doc) => (
                    {...doc.data(), id:doc.id}
                ))

                setTodos(newData)

                console.log(todos,newData)

            })
        }

        useEffect(() => {
            fetchPost()
        }, []); //you can add "todos" to array to automatically update the website but it will use up the firesotre materials really quick




    //UPDATE (WIP)

        function handleClick() {
            setBtnState(btnState => !btnState)

        }

        let toggleClassCheck =  btnState ? "hidden" : null

        const editTodo = async (id) => {
            await updateDoc(doc(db, "todos", id), {
                todo: "gibble"
            })     
        }



    //DELETE

        const deleteTodo = async (id) =>{
            await deleteDoc(doc(db, "todos", id))
        }

        
    return (
        <section className="todo">
            <h1 className="todo__title">What are you up to today?</h1>

            <div className="todo__input">
                <input className="todo__input-area" placeholder="What happening?" type="text" onChange={(e) => setTodo(e.target.value)} />

                <button className="btn  button--bgcolor-grey button--text-white button--animation-hover" type="input" onClick={addTodo}>Submit</button>
            </div>

            

            <div>

                    <h1 className="todo__title">Added To-Do:</h1>

                    {todos.map((todo, i) => (

                        <div className="todo-list">
                            <div className="todo-list__wrapper">
                                <input className={"todo-list__list-item"} type="text" readOnly key={i} value={todo.todo}/>
                                {/* <input className="todo__edit" key={i} type="text"  /> */} {/*WIP edit functionality*/}
                            </div>
                            
                            <div className="button-wrapper">
                            {/* <button key={i} type="input" onClick={handleClick}>✏️</button>  WIP: () => editTodo(todo.id) */}
                                <button className="btn button--bgcolor-grey button--animation-hover" key={i} type="input" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                            </div>
                        </div>

                    ))}

            </div>
        </section>
    )
}


export default Todo