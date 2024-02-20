import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  theme: localStorage.getItem('theme'),
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(state.user))
      toast.success(`welcome back ${state.user.user.username}`)
    },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
      toast.success('successfully logout')
    },
  },
})
export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
