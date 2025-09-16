"use client"

import {Button} from "@/components/button/button"
import x from "@/public/X.svg"

const TodoList = ({todos, setTodos}) => { // Принимаем todos и setTodos из родителя
  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const handleToggleTodo = (id) => {
    setTodos(prevTodos =>
        prevTodos.map(todo =>
            todo.id === id
                ? {...todo, completed: !todo.completed}
                : todo
        )
    )
  }

  const handleDeleteAll = () => {
    setTodos([])
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
      <div className="w-full ">
        <div className="border-t pt-2 w-full flex justify-between">
          <span className="text-xl self-center">
            Total Tasks: {todos.length}
          </span>
          <Button variant="custom" className="text-xl" onClick={handleDeleteAll}>
            Delete All
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {todos.length === 0 ? (
              <p className="text-center text-gray-500">No todos yet. Add one above!</p>
          ) : (
              todos.map((todo) => (
                  <div
                      key={todo.id}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                          todo.completed
                              ? "bg-gray-100 dark:bg-gray-800 line-through text-gray-500 dark:text-gray-400"
                              : " dark:bg-gray-900"
                      }`}
                  >
                    <div className="flex gap-2 items-center ">
                      <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleTodo(todo.id)}
                          className="w-4 h-4"
                      />
                      <span>
                        {todo.text}
                      </span>

                    </div>

                    <div className="flex items-center gap-4">
                      <span
                          className={`"text-xs text-gray-500 dark:text-gray-400" ${todo.completed && "text-gray-500"}`}>
                          {formatDate(todo.createdAt)}
                      </span>
                      <Button
                          variant="link"
                          size="icon"
                          onClick={() => handleDeleteTodo(todo.id)}
                          className={`${todo.completed && "hover:bg-gray-300"}`}
                      >
                        < img src={x.src} alt="Delete"/>
                      </Button>
                    </div>
                  </div>
              ))
          )}
        </div>

        <div className="mt-6 text-sm text-center text-gray-500">
          Completed: {todos.filter(t => t.completed).length} |
          Pending: {todos.filter(t => !t.completed).length}
        </div>
      </div>
  )
}

export default TodoList