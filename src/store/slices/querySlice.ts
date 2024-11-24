import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// export const fetchPhotos = createAsyncThunk(
//     'photos/fetchPhotos',
//     async () => {
//         const photos = await axios.get(`${baseURL}/`)
//     }
// )

const initialState = {
    earthDate: '',
    rover: ''
}

const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setDate(state, action: PayloadAction<any>) { //убрать any
            
            state.earthDate = action.payload;
        },
        setRover(state, action: PayloadAction<any>) {
            state.rover = action.payload;
        }
    }
})

export const { setDate, setRover } = querySlice.actions;
export default querySlice.reducer;