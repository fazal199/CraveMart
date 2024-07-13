
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const craveMartstore = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof craveMartstore.dispatch;
export type RootState = ReturnType<typeof craveMartstore.getState>;

//guide to use
// const value = useSelector((state: RootState) => state.example.value);
// const dispatch: AppDispatch = useDispatch();

export default craveMartstore;
