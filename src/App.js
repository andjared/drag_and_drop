import DragNDrop from "./components/DragNDrop";

function App() {
  const data = [
    { title: "first group", items: ["1", "2", "3", "4", "5", "6"] },
    { title: "second group", items: ["7", "8", "9", "10"] },
  ];
  return (
    <main>
      <DragNDrop data={data} />
    </main>
  );
}

export default App;
