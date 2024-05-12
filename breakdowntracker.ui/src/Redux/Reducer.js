import { FETCH_ALL_DATA_FAILURE, FETCH_ALL_DATA_SUCCESS, FETCH_BYREF_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, OPEN_POPUP, POST_ADD_ACC, PUT_UPDATE_ACC } from "./ActionType";

const initialState = {
    breakdownList: [],
    breakdownObj: {},
    loading: false,
    error: null
  };

 export const BreakdownReducer = (state = initialState, action) => {
  console.log(action.type);
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
        case FETCH_ALL_DATA_SUCCESS:
          return {
            ...state,
            loading: false,
            breakdownList: action.payload
          };
          case FETCH_BYREF_SUCCESS:
            return {
              ...state,
              breakdownObj: action.payload
            };
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          breakdownObj: action.payload
        };
        case FETCH_ALL_DATA_FAILURE:
          return {
            ...state,
            loading: false,
            breakdownList:[],
            error: action.payload
          };

          case OPEN_POPUP:
            return {
              ...state,
              breakdownObj:{}
            };
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        case POST_ADD_ACC:
          const _inputData ={...action.payload}
          return {
            ...state,
            breakdownList: [...state.breakdownList,_inputData]
          };
          case PUT_UPDATE_ACC:
            const _updateData ={...action.payload}
            const _finalData = state.breakdownList.map(item=> {
              return item.breakdownReference === _updateData.breakdownReference ? _updateData : item
            })
            return {
              ...state,
              breakdownList: _finalData
            };
      default:
        return state;
    }
  };