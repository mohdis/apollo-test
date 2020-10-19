import React from 'react'
import TodoItem from '../todo-item/todo-item.component'

import './todo-list.style.scss'

const TodoList = ({ todos }) => {
  return todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
}
export default TodoList
