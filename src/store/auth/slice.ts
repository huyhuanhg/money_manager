import { createSlice } from "@reduxjs/toolkit"
import { fetchLogin } from "./action"

const initialState = {
  status: 'abc'
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        console.log('123123123 :>> ', 123123123);
        state.status = 'loading'
      })
  }
})

export default auth.reducer
