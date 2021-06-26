import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean 
};

export function Button({ isOutlined = false, ...props }: ButtonProps) { //pega todas as propriedades que o botão recebe e passando para o html.
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`} //se isOutlined existe coloca uma classe a mais
            {...props} 
        />
    )
}
