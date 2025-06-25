//
// (c) 2025, burdon.io
//

import clsx from 'clsx'
import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class='absolute inset-0 flex items-center justify-center border-2 border-red-500'>
      <div class='flex flex-col items-center justify-center gap-4'>
        <button onClick={() => setCount(count() + 1)}>Click me!!!!!!!</button>
        <p class={clsx('text-[10rem] font-bold text-green-500', count() > 10 && 'text-red-500 animate-spin')}>{count()}</p>
      </div>
    </div>
  )
}

export default App
