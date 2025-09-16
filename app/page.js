"use client"

import ThemeChanger from "@/components/theme/theme-changer"
import TodoList from "@/components/todo-list/list"
import Form from "@/components/form/form"
import {useState, useEffect} from "react"

export default function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch (error) {
        console.error("Error parsing todos:", error)
      }
    }
  }, [])

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (newTodo) => {
    setTodos(prev => [...prev, newTodo])
  }

  return (
      <div
          className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <header>
          <ThemeChanger/>
        </header>
        <main
            className="flex flex-col row-start-2 items-center sm:items-start border p-8 rounded-md shadow-xl/30 w-1/4">
          <h1 className="font-bold sm:text-4xl self-center">To Do List</h1>
          <Form onAddTodo={handleAddTodo}/>
          <TodoList todos={todos} setTodos={setTodos}/>
        </main>
        <footer
            className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        </footer>
      </div>
  )
}