import axios from "axios";
import { AddRequest, UpdateRequest, fetchAllDataFailure, fetchAllDataSuccess, fetchByRefSuccess, fetchDataRequest } from "./Action";
import { toast } from "react-toastify";

const baseURL = "https://localhost:7276/api/Breakdown";

export const GetAllBreakdowns=()=>{
    return (dispatch)=>{
        dispatch(fetchDataRequest());
        axios.get(baseURL).then(res=>{
            const _list = res.data;
            dispatch(fetchAllDataSuccess(_list))
        }).catch(err=>{
            dispatch(fetchAllDataFailure(err.message))
        });
    }
}

export const CreateBreakdown=(data)=>{
    return (dispatch)=>{
        dispatch(fetchDataRequest());
        axios.post(baseURL,data).then(res=>{
            const item = res.data;
            dispatch(AddRequest(item))
            toast.success('Breakdown created successfully')
        }).catch(err=>{
            toast.error('Breakdown failed to create due to: ' + err.message)

        });
    }
}
export const UpdateBreakdown=(breakdownReference, data)=>{
    return (dispatch)=>{

        axios.put(`${baseURL}/${breakdownReference}`, data).then(res=>{
            const item = res.data;
            dispatch(UpdateRequest(item))
            toast.success('Breakdown updated successfully')
        }).catch(err=>{
            toast.error('Breakdown failed to update due to: ' + err.message)

        });
    }
}

export const FetchBreakdownByRef=(ref)=>{
    return (dispatch)=>{
        dispatch(fetchDataRequest());
        axios.get(`${baseURL}/${ref}`).then(res=>{
            const _obj = res.data;
            dispatch(fetchByRefSuccess(_obj));
        }).catch(err=>{
            toast.error('Breakdow failed to fetch the data')
        });
    }
}