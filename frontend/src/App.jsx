// src/App.jsx
import './App.css';
import ProductList from './components/ProductList/ProductList.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Productos React</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;
