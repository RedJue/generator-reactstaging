export default function reducer(state={
  age:'age'
}, action) {
    switch (action.type) {
      case "EXAMPLE_DEMO": {
        return {age:action.programmer.age}
      }
    }
    return state
}
