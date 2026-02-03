type headerprops = {
  title: string;
};

export function Header(props: headerprops) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}