import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import WeatherPage from './Components/WeatherPage';
import SavedCity from './Components/SavedCity';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path='/signup'  element={<Signup/>}/>
          <Route path='/weather/:userId'  element={<WeatherPage/>}/>
          <Route path='/saved/:userId'  element={<SavedCity/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
