export default function reducer(state, action) {
  switch (action.type) {
    case "SET_FETCHED_ITEMS":
      return {
        items: action.items,
        toRemove: [],
      };
    case "UPDATE_ITEM":
      return {
        items: state.items.map((item) => {
          if (item.sku == action.sku) {
            item.quantity = action.quantity;
          }
          return item;
        }),
        toRemove: [],
      };
    case "QUEUE_FOR_REMOVAL":
      return {
        items: state.items,
        toRemove: [...state.toRemove, action.sku],
      };
    case "CLEAN_REMOVAL_QUEQUE":
      return {
        items: state.items.filter((item) => !state.toRemove.includes(item.sku)),
        toRemove: [],
      };
    case "UNDO_REMOVE":
      return {
        items: state.items,
        toRemove: state.toRemove.filter((item) => item !== action.sku),
      };
    default:
      return state;
  }
}
