import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./UI/ProtectedRoutes";
import AppLayout from "./UI/AppLayout";
import Hotels from "./pages/hostels/Hotels";
import HotelDetails from "./pages/hostels/HotelDetails";
import Bookings from "./pages/booking/Bookings";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 0 } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="hotels" />} />
            <Route path="hotels" element={<Hotels />} />

            <Route path="hotels/:hotelId" element={<HotelDetails />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "18px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
