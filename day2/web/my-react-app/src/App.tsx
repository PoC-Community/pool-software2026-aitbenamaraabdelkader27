import { Header } from './components/header';
import { Button } from './components/Button';
import { Counter } from './components/Counter';
import { Card } from './components/Card';
import { LiveInput } from './components/Input';



export default function App() {
  return (
    <div>
      <Header title="Welcome to My App" />
      <Card title="Card Title" description="This is a description of the card.">
        <Button onClick={() => alert('Button clicked!')} disabled={false} type="button">
          Click Me
        </Button>
        
      </Card>
        <Card title="Counter" description="useState basics">
          <Counter />
        </Card>

        <Card title=" Input" description="controlled component">
          <LiveInput />
        </Card>      
    </div>
  );
}