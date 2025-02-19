import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import Movie from "./pages/Movie";
import Movies from "./pages/movies";
import Theatre from "./pages/Theatre";

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 0,
    },
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index path="" element={<Home />}/>
        <Route path="/service" element={<Service />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/theatre/:theatreId" element={<Theatre />} />
        <Route path="*" element={<PageNotFound />}/>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/signin" element={<Signin />}/>
    </>
  )
);

function App() {

  return (
    <QueryClientProvider client={ queryClient }>
      <RouterProvider router={router}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success : {
              duration : 3000
            },
            error : {
              duration : 4000
            },
            style : {
              font : "16px",
              maxWidth : "500px",
              padding : "16px 24px",
              color : "#374151",
            }
          }}
        />
      </RouterProvider>
    </QueryClientProvider>
  )
}

export default App
