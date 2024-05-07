import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import	Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeCards from './components/HomeCards'
import Joblistings from './components/JobsListings'
import ViewAllJobs from './components/ViewAllJobs'
import MainLayout from './Layouts/MainLayout'
import HomePage from './Pages/HomePage'
import JobsPage from './Pages/JobsPage'
import NotFoundPage from './Pages/NotFound'
import JobPage, {jobLoader} from './Pages/JobPage'
import AddJobPage from './Pages/AddJobPage'


const App = () => {
  const addJob = (newJob) => {
    console.log(newJob);
  } 
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/jobs/:id' element={<JobPage />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}
 
export default App;