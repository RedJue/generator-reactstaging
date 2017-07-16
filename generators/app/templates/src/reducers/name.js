export default function reducer(state={
  name:'name'
}, action) {
    switch (action.type) {
      case "EXAMPLE_DEMO": {
        return {name:action.programmer.name}
      }
    }
    return state
}