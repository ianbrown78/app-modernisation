import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Todos from './components/Todos';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

import './App.css';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/v/:id" element={<Todo />} />
          <Route path="/e" element={<TodoForm />} />
          <Route path="/e/:id" element={<TodoForm />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
