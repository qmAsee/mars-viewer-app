import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store, {persistor} from './store/store.ts'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import PhotoDetails from './components/PhotoDetails/PhotoDetails.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>this page does not exist</h1>,
    // children: [
    //   {
    //     path: "/:photoId",
    //     element: <PhotoDetails />
    //   }
    // ]
  },
  {
    path: "/:photoId",
    element: <PhotoDetails />,
  }
], {
  future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    }
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    {/* <StrictMode> */}
      {/* <App /> */}
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router} />
    </PersistGate>
    {/* </StrictMode> */}
  </Provider>,
)
