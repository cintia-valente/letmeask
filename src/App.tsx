import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from "./contexts/AuthContext"
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
   </BrowserRouter>
  );
}

export default App;

//Componente no React é uma função que devolve um HTML, sempre com letra maiúscula.
//Propriedade são infos q podemos passar para um componente se comportar de 
//maneira diferente.

//Estado info mantida por um componente dentro do react, sempre q tiver uma info
//q terá seu valor alterado pelo uso do usuário, por ex clicar em um botão, então
//terá um novo valor.

//Contextos compartilhar infos entre vários componentes, pode ser usado em autenticação.

//hook = user, criado quando uma funcionalidade é compartilhada por mais de um componente.

 //o map permite não só iterar, mas também retornar um algo