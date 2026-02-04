import { Header } from "./components/header";
import { Button } from "./components/Button";
import { Counter } from "./components/Counter";
import { Card } from "./components/Card";
import { LiveInput } from "./components/Input";

import { Timer } from "./testeffects/Timer";
import { LocalStorageDemo } from "./testeffects/LocalStorage";
import { ContactForm } from "./testeffects/ContactForm";
import { Search } from "./testeffects/Search";
import { ComposedCardDemo } from "./testeffects/ComposedCard";
import { PropsDrillingDemo } from "./testeffects/PropsDrilling";
import { TemperatureConverter } from "./testeffects/TemperatureConverter";
import { ProductList } from "./testeffects/ProductList";
import { TodoApp } from "./todoApp/todoApp";



export default function App() {
  return (
    <div>
      <Header title="Welcome to My App" />

      <Card title="Card Title" description="This is a description of the card.">
        <Button onClick={() => alert("Button clicked!")} disabled={false} type="button">
          Click Me
        </Button>
      </Card>

      <Card title="Counter" description="useState basics">
        <Counter />
      </Card>

      <Card title="Input" description="controlled component">
        <LiveInput />
      </Card>

      <Card title="Timer" description="useEffect + cleanup">
        <Timer />
      </Card>

      <Card title="LocalStorage" description="useEffect + dependencies">
        <LocalStorageDemo />
      </Card>
      <Card title="Contact Form" description="Controlled form + validation">
        <ContactForm />
      </Card>

      <Card title="Search" description="Controlled input + debounce">
        <Search />
      </Card>
      <Card title="Step 5.1" description="Composition with children">
        <ComposedCardDemo />
      </Card>

      <Card title="Step 5.2" description="Props drilling (Parent → Child → GrandChild)">
        <PropsDrillingDemo />
      </Card>

      <Card title="Step 5.3" description="Lift state up (Celsius/Fahrenheit)">
        <TemperatureConverter />
      </Card>
      <Card title="Step 5.4" description="Product list with filter and search">
        <ProductList />
      </Card>

    </div>  
  );
}
