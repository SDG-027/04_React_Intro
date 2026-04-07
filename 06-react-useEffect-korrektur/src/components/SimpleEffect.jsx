export default function SimpleEffect() {
  return (
    <main className='min-h-screen bg-gray-800 p-8 font-sans'>
      <h1 className='text-center text-3xl font-bold text-gray-300'>
        Star Wars Characters | Fetch in Effect
      </h1>

      <div className='flex justify-center gap-4 pt-6'>
        <button type='button'>Previous</button>
        <button type='button'>Next</button>
      </div>

      <p className='text-center font-medium text-gray-600'>Loading...</p>

      <p className='text-center font-semibold text-red-500'>Sorry, try again :(</p>

      <ul className='grid gap-4 sm:grid-cols-2'>
        <li className='rounded bg-white p-4 text-center capitalize shadow'>
          <span className='font-semibold text-gray-800'>Luke Skywalker</span>
        </li>
      </ul>
    </main>
  );
}
