import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Login  from './pages/Login';
import Activate from './pages/Activate';
import NewTask from './pages/NewTask'; 
import Tasks from './pages/Tasks'; 
import TaskDetail from './pages/TaskDetail'; 


// Pages
export default [
    // Index page
    {
      path: '/',
      component: Home,
    },
    // About page
    {
      path: '/about/',
      component: About,
    },
    {
      path: '/signup/',
      component: Signup,
    },
    {
      path: '/profile/',
      component: Profile,
    },
    {
      path: '/login/',
      component: Login,
    },
    {
      path: '/activate/',
      component: Activate,
    },
    {
      path:'/newtask/',
      component: NewTask,
    },
    {
      path:'/tasks/',
      component: Tasks,
    },
    {
      path:'/taskdetail/:taskid/',
      component: TaskDetail,
    }
]