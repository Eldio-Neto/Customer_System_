import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';


const RoutesApp = ()=>{
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Clientes/>}/>
                <Route path="/clientes" element={<Clientes/>}/>
                <Route path="/pedidos" element={<Pedidos/>}/>                
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;