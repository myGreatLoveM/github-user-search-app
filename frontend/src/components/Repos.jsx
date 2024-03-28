import Repo from './Repo'

function Repos({ repos, alwaysFullWidth = false }) {
  return (
    <div
      className={`${
        alwaysFullWidth ? 'w-full' : 'lg:w-2/3 w-full'
      } bg-glass rounded-lg px-10 py-6`}
    >
      {repos.length > 0 ? (
        <ol className='relative border-s border-gray-200'>
          {repos.map((repo) => (
            <Repo key={repo.id} repo={repo} />
          ))}
        </ol>
      ) : (
        <div className='text-center text-lg h-32'>
          User has not created any repository{' '}
        </div>
      )}
    </div>
  )
}

export default Repos
