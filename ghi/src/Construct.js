function Construct(props) {
  const pad2 = (num) => String(num).padStart(2, "0");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <h2>The current Date is:</h2>
        <h3>
          {props.info.year}-{pad2(props.info.month)}-{pad2(props.info.day)}
        </h3>
        <h2>The current time is:</h2>
        <h3>
          {pad2(props.info.hour)}:{pad2(props.info.min)}
        </h3>
      </header>
    </div>
  );
}

export default Construct;
