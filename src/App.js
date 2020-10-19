import React from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'

import AddTodo from './components/add-todo/add-todo.component'
import TodoList from './components/todo-list/todo-list.component'

import { GET_TODOS } from './apollo/queries'
import { isUpdatingVar } from './apollo/cache'

import './App.css'

function App() {
  const isUpdating = useReactiveVar(isUpdatingVar)
  const { data, loading, error } = useQuery(GET_TODOS)

  if (loading) return <div className="container">LOADING</div>
  if (error) return <div className="error">error</div>

  return (
    <div className="container">
      {isUpdating && <p>Application State is updating please wait</p>}
      <br />
      <AddTodo />
      <TodoList todos={data.todos} />
    </div>
  )
}

export default App
