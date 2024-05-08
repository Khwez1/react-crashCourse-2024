import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeCards from "./components/HomeCards";
import Joblistings from "./components/JobsListings";
import ViewAllJobs from "./components/ViewAllJobs";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFound";
import JobPage, { jobLoader } from "./Pages/JobPage";
import AddJobPage from "./Pages/AddJobPage";
import EditJobPage from "./Pages/EditJobPage";
import axios from "axios";

const App = () => {
  const addJob = async (newJob) => {
    try {
      const res = await axios.post("/api/jobs", newJob);
      return res.data; // Assuming the response contains useful data
    } catch (error) {
      console.error("Error adding job:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };
  //Delete job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      // No explicit return needed if no specific data is required after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };
  //Update job
  const UpdateJob = async (job) => {
    try {
      const res = await axios.patch(`/api/jobs/${job.id}`, job);
      return res.data; // Assuming the response contains useful data
    } catch (error) {
      console.error("Error adding job:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={UpdateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
