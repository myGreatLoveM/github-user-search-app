import { FaCodeBranch, FaCopy, FaRegStar } from 'react-icons/fa'
import { FaCodeFork } from 'react-icons/fa6'
import { formatDate } from '../utils/functions'
import { PROGRAMMING_LANGUAGES } from '../utils/constants'
import toast from 'react-hot-toast'

function Repo({ repo }) {
  const handleCloneClick = async (repo) => {
    try {
      await navigator.clipboard.writeText(repo.clone)
      toast.success('Repo URL clone to clipboard')
    } catch (error) {
      toast.error("Couldn't clone, Please try again")
    }
  }

  return (
    <li className='relative space-y-3 mb-10 ms-7'>
      <span
        className='absolute flex items-center justify-center w-6 h-6 bg-blue-100
			rounded-full -left-10 top-1.5 ring-8 ring-white'
      >
        <FaCodeBranch className='w-5 h-5 text-blue-800' />
      </span>
      <div className='ps-2 flex flex-col gap-1.5'>
        <div className='flex gap-2 items-center flex-wrap'>
          <a
            href={repo.html_url}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-2 text-lg font-semibold'
          >
            {repo.name}
          </a>
          <span
            className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
					py-0.5 rounded-full flex items-center gap-1'
          >
            <FaRegStar />
            {repo.stargazers_count}
          </span>
          <span
            className='bg-purple-100 text-purple-800 text-xs font-medium
					 px-2.5 py-0.5 rounded-full flex items-center gap-1'
          >
            <FaCodeFork /> {repo.forks_count}
          </span>
          <span
            className='cursor-pointer bg-green-100 text-green-800 text-xs
					font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1'
            onClick={() => handleCloneClick(repo)}
          >
            <FaCopy /> Clone
          </span>
        </div>

        <time
          className='block my-1 text-xs font-normal leading-none
			 text-gray-400'
        >
          {formatDate(repo.created_at)}
        </time>
        <p className='text-base font-normal text-gray-500'>
          {repo.description?.slice(0, 200) || 'No description about repository'}
        </p>
      </div>

      {PROGRAMMING_LANGUAGES[repo.language] && (
        <img
          src={PROGRAMMING_LANGUAGES[repo.language]}
          alt='Programming language icon'
          className='h-8'
        />
      )}
    </li>
  )
}

export default Repo
