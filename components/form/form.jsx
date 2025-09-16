"use client"

import {Button} from "@/components/button/button"
import {useState} from "react"

const Form = ({children, onAddTodo}) => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("")


  const saveTodos = (newTodo) => {
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }

      onAddTodo(newTodo)
      saveTodos(newTodo)
      setInputValue("")
    }
  }

  return (
      <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 flex justify-between gap-6 mt-4"
      >
        <input
            type="text"
            placeholder="Enter your todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md"
        />
        {children}
        <Button className="w-[20%]" size="lg" type="submit">Add</Button>
      </form>
  )
}

export default Form