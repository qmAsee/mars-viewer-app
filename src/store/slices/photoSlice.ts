import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPhoto } from "@/types/types";
import { baseURL } from '../../utils/constants.js';

export const fetchPhotos = createAsyncThunk<IPhoto[], void, { rejectValue: string }>(
    'photos/fetchPhotos',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any; // Укажите правильный тип для state, если он у вас есть
            const { earthDate, rover } = state.queryReducer;

            // const response = await axios.get(`${baseURL}${earthDate}&page=1&api_key=wQjo9KHoqCoy91keCeKFigp0ZsfB1KVEdj9CIlUx`);
            const response = await axios.get(`${baseURL}/${rover}/photos?earth_date=${earthDate}&api_key=wQjo9KHoqCoy91keCeKFigp0ZsfB1KVEdj9CIlUx`);
            return response.data.photos;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
    {
        serializeError: (error) => {
            // Сериализуем ошибку, возвращая только ее сообщение
            return { message: error.message };
        },
    }
);

export interface PhotoState {
    photos: IPhoto[];
    showedPhotos: IPhoto[];
    clickedPhoto: IPhoto | null;
    status: string;
    error: null | string | undefined;

    currentPage: number;
    totalItems: number | null;
    itemsPerPage: number;
}

const initialState: PhotoState = {
    photos: [],
    showedPhotos: [],
    clickedPhoto: null,
    status: '',
    error: null,

    currentPage: 1,
    totalItems: null,
    itemsPerPage: 21,
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos(state, action: PayloadAction<IPhoto[]>) {
            state.photos = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            console.log(state.showedPhotos)
            state.currentPage = action.payload;
        },
        nextPage(state) {
            state.currentPage = state.currentPage + 1 
        },
        prevPage(state) {
            state.currentPage = state.currentPage - 1
        },
        setShowedPhotos(state) {
            state.showedPhotos = state.photos.slice(state.itemsPerPage * state.currentPage - state.itemsPerPage, state.itemsPerPage * state.currentPage)
        },
        setClickedPhoto(state, action) {
            state.clickedPhoto = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.photos = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'An error occurred';
            });
    },
});

export const { setPhotos, setShowedPhotos, setPage, nextPage, prevPage, setClickedPhoto } = photosSlice.actions;
export default photosSlice.reducer;
