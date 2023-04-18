import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchLogin = createAsyncThunk('auth/login', async () => {
  console.log('auth/login :>> ', 12313123);
  return 'test'
})
