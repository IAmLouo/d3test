//
// (c) 2025, burdon.io
//

import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class='absolute inset-0 flex items-center justify-center'>
      <div class='flex flex-col items-center justify-center gap-4'>
        <button onClick={() => setCount(count() + 1)}>Click me</button>
        <p class='text-2xl font-bold'>{count()}</p>
      </div>
    </div>
  )
}

export default App
