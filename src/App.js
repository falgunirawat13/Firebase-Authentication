import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';

function App(){

  return(
    <div className='app'>
      <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        
      </Routes>
      </Router>
      </div>
  )
}


export default App;