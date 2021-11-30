import './App.css';
import Navbar from './conponent/navbar/Navbar';
import Homepage from './conponent/homepage/Homepage';
import { AuthContextProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Navbar />
        <Homepage />
      </div>
    </AuthContextProvider>
  );
}

export default App;
