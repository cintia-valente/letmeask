import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'

import girl from '../assets/images/girl.png';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState(''); //estado que armazena o valor do input

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault(); //previne um comportamento

        if (newRoom.trim() === '') {// remove espaço da esquerda e direita
            return;
        }

        const roomRef = database.ref('rooms');//se refere a um dado que inseri no banco, tem uma categoria no banco que chama rooms

        const firebaseRoom = await roomRef.push({ //joga uma sala dentro de 'rooms'
            title: newRoom,
            authorId: user?.id,
        }) 

        history.push(`/rooms/${firebaseRoom.key}`);//retorna o id da sala
    }

    return (
        <div id="page-auth">
                    <aside>
                        <img src={girl} alt="Ilustração simbolizando perguntas e respostas" />
                        <strong>Crie salas de Q&A ao vivo</strong>
                        <p>Tire as dúvidas da sua audiência em tempo real.</p>
                    </aside>
                    <main>
                        <div className="main-content">
                            <img src={logoImg} alt="Letmeask" />
                            <h2>Criar uma nova sala</h2>
                            <form onSubmit={handleCreateRoom}>
                                <input 
                                type="text" 
                                placeholder="Nome da sala"
                                onChange={event => setNewRoom(event.target.value)}//toda vez que input tiver o valor alterado, pega o evento.
                                value={newRoom}
                                />
                                <Button type="submit">
                                    Criar sala
                                </Button>
                            </form>
                            <p>
                                Quer entrar em uma sala existente <Link to="/">Clique aqui</Link>
                            </p>
                        </div>
                    </main>
                </div>
            )
        }

function userAuth(): { user: any; } {
    throw new Error('Function not implemented.');
}
