import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { UPDATE_TODO } from '../../apollo/queries'
import { toggleIsUpdating } from '../../apollo/cache'

const TodoItem = ({ todo }) => {
  const [updateTodo, { loading, error }] = useMutation(UPDATE_TODO, {
    onCompleted: () => toggleIsUpdating(),
  })

  const [todoType, setTodoType] = useState(todo.type)

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <input
        value={todoType}
        placeholder="Enter something"
        onChange={(event) => setTodoType(event.target.value)}
      />
      <button
        className="custom-button"
        onClick={() => {
          if (todoType === '') return
          toggleIsUpdating()
          updateTodo({ variables: { type: todoType, id: todo.id } })
        }}
      >
        <i className="far fa-edit"></i>
      </button>
    </div>
  )
}
export default TodoItem
