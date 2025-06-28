//
// (c) 2025, burdon.io
//

import clsx from 'clsx'
import { createSignal } from 'solid-js'
import D3Circle from './D3Circle'

const initialNodes = [
  { id: 'A' },
  { id: 'B' },
  { id: 'C' },
  { id: 'D' },
];
const initialLinks = [
  { source: 'A', target: 'B' },
  { source: 'A', target: 'C' },
  { source: 'B', target: 'D' },
];

function App() {
  const [count, setCount] = createSignal(0)
  const [nodes, setNodes] = createSignal(initialNodes)
  const [links, setLinks] = createSignal(initialLinks)

  const addNode = () => {
    const newId = String.fromCharCode(65 + nodes().length)
    setNodes([...nodes(), { id: newId }])
    // Link new node to a random existing node
    const randomNode = nodes()[Math.floor(Math.random() * nodes().length)]
    setLinks([...links(), { source: randomNode.id, target: newId }])
  }

  return (
    <div class='absolute inset-0 flex items-center justify-center border-2 border-red-500'>
      <div class='flex flex-col items-center justify-center gap-4'>
        <button onClick={() => setCount(count() + 1)}>Click me if you dare.</button>
        <button onClick={addNode}>Add Node</button>
        <p class={`text-[10rem] font-bold ${
          count() % 3 === 0 && count() % 5 === 0 ? 'text-green-500' : 
          count() % 3 === 0 ? 'text-yellow-500' : 
          count() % 5 === 0 ? 'text-blue-500' : 
          'text-gray-500'
        }`}>
          {count() % 3 === 0 && count() % 5 === 0 ? 'fizzbuzz' : 
           count() % 3 === 0 ? 'fizz' : 
           count() % 5 === 0 ? 'buzz' : 
           count()}
        </p>
        <D3Circle nodes={nodes()} links={links()} />
      </div>
    </div>
  )
}

export default App
