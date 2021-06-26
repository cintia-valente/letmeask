import firebase from "firebase";
import { useEffect } from "react";
import { useState } from "react";
import { createContext , ReactNode} from "react";
import { auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    //se sair da aplicação, quando voltar não precisa logar novamente:
    //dispara funcionalidades sempre que algo acontecer, info que mudou, componente mostrado em tela
    useEffect(() => { //prim parâmetro qual função executar, segundo quando executar, sempre será um vetor
        const unsubscribe = auth.onAuthStateChanged(user => {//se detectar que um usuário já tinha logado, retorna o usuário
          if (user) {
            const { displayName, photoURL, uid } = user
    
            if (!displayName || !photoURL) { //se o usuário não tiver nome ou foto
              throw new Error('Missing information from Google Account');
            }
      
            setUser({ //se tiver o nome e foto, preenche o usuário
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        })
    
        return () => {
          unsubscribe();
        }
      }, [])
    
      async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
    
        if (result.user) { //se a autenticação deu certo, busca dados
          const { displayName, photoURL, uid } = result.user
    
          if (!displayName || !photoURL) { //se o usuário não tiver nome ou foto
            throw new Error('Missing information from Google Account');
          }
    
          setUser({ //se tiver o nome e foto, preenche o usuário
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      }

    //todas as pag terão acesso ao usuário logado 
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}> 
            {props.children}
        </AuthContext.Provider>
    );
}