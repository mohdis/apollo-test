import { gql } from '@apollo/client'

export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      type
    }
  }
`
export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`
export const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      type
      id
    }
  }
`
