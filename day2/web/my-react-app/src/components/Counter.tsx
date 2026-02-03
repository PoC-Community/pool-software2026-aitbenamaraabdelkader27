import { useState } from 'react';
import { Button } from './Button';

export function Counter() {
    const [count, setCount] = useState<number>(0);
    
    return (
        <div>
            <strong>Count: {count}</strong>
            <button onClick={() => setCount((c) => c + 1)} >+1</button>
            <button onClick={() => setCount((c) => c - 1)}>-1</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}