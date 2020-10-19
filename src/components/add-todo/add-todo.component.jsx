import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

import { ADD_TODO } from '../../apollo/queries'

import { toggleIsUpdating } from '../../apollo/cache'

import './add-todo.style.scss'

const AddTodo = () => {
  const [newTodoType, setNewTodotype] = useState('')

  const [addTodo, { loading, error }] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodosRef = [], { readField }) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment AddTodo on Todo {
                  id
                  type
                }
              `,
            })

            // safety check
            if (
              existingTodosRef.find(
                (todoRef) => readField('id', todoRef) === addTodo.id
              )
            ) {
              return existingTodosRef
            }

            return [...existingTodosRef, newTodoRef]
          },
        },
      })
      toggleIsUpdating()
      setNewTodotype('')
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    addTodo({
      variables: {
        type: newTodoType,
      },
    })
    toggleIsUpdating()
  }

  if (loading) return <div>LOADING</div>
  if (error) return <div>Error</div>

  return (
    <form onSubmit={onSubmit}>
      <input
        name="type"
        placeholder="Enter new Todo"
        value={newTodoType}
        onChange={(event) => setNewTodotype(event.target.value)}
      />
      <button type="submit">
        <i className="fas fa-plus"></i>
      </button>
    </form>
  )
}

export default AddTodo
