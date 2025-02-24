import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: [], token: null ,bill:null},
    reducers: {
        setCredentials: (state, action) => {
            const { payload, accessToken } = action.payload
            state.user = payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        },
        Bills :(state, action)=>{
            state.bill = action.payload
        }
        ,
        employees :(state, action)=>{
            state.bill = action.payload
        }
    },
})

export const { setCredentials, logOut,Bills,employees } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentBill = (state) =>state.auth.Bills
export const selectCurrentEmployee = (state) =>state.auth.employees