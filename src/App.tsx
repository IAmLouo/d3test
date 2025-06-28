//
// (c) 2025, burdon.io
//

import clsx from 'clsx'
import { createSignal } from 'solid-js'
import D3Circle from './D3Circle'

type Fizzy = { fizz?: boolean, buzz?: boolean, quiz?: boolean }

const getFizzy = (n: number): Fizzy => ({
  fizz: n % 3 === 0,
  buzz: n % 5 === 0,
  quiz: n % 7 === 0,
})

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

  const handleClick = () => {
    setCount(count() + 1)
    const newId = String.fromCharCode(65 + nodes().length)
    setNodes([...nodes(), { id: newId }])
    // Link new node to a random existing node
    const randomNode = nodes()[Math.floor(Math.random() * nodes().length)]
    setLinks([...links(), { source: randomNode.id, target: newId }])
  }

  return (
    <div class='absolute inset-0 flex items-center justify-center border-2 border-red-500'>
      <div class='flex flex-col items-center justify-center gap-4'>
        <button onClick={handleClick}>Click me if you dare.</button>
        {(() => {
          const { fizz, buzz, quiz } = getFizzy(count())
          return (
            <p class={clsx('text-[10rem] font-bold', 
              fizz && buzz && quiz ? 'text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]' :
              fizz && buzz ? 'text-green-500' :
              fizz && quiz ? 'text-orange-500' :
              buzz && quiz ? 'text-purple-500' :
              fizz ? 'text-yellow-500' :
              buzz ? 'text-blue-500' :
              quiz ? 'text-red-500' :
              'text-gray-500'
            )}>
              {fizz && buzz && quiz ? 'fizzbuzzquiz' : 
               fizz && buzz ? 'fizzbuzz' : 
               fizz && quiz ? 'fizzquiz' : 
               buzz && quiz ? 'buzzquiz' : 
               fizz ? 'fizz' : 
               buzz ? 'buzz' : 
               quiz ? 'quiz' : 
               count()}
            </p>
          )
        })()}
        <D3Circle nodes={nodes()} links={links()} />
      </div>
    </div>
  )
}

export default App
