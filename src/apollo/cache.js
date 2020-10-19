import { InMemoryCache, makeVar } from '@apollo/client'

export const isUpdatingVar = makeVar(false)
export const toggleIsUpdating = () => isUpdatingVar(!isUpdatingVar())

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isUpdating: {
          read() {
            return isUpdatingVar()
          },
        },
      },
    },
  },
})

export default cache
