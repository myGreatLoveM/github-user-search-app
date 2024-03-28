import { useState } from 'react'
import Spinner from '../components/Spinner'
import Repos from '../components/Repos'

function ExplorePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [popularRepos, setPopularRepos] = useState([])
  const [loading, setLoading] = useState(false)

  const exploreRepos = async (language) => {
    setLoading(true)
    setPopularRepos([])
    try {
      const reposRes = await fetch(
        `http://localhost:5000/api/explore/repos/${language}`,
      )
      const reposData = await reposRes.json()
      setPopularRepos(reposData.data)
      setSelectedLanguage(language)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-4'>
      <div className='bg-glass max-w-2xl mx-auto rounded-md p-4 flex flex-col gap-3'>
        <h1 className='text-xl font-bold text-center'>
          Explore Popular Repositories
        </h1>
        <div className='flex flex-wrap gap-4 my-2 justify-center'>
          <img
            src='/javascript.svg'
            alt='JavaScript'
            className={`h-11 sm:h-20 border-2  rounded-md cursor-pointer ${
              selectedLanguage === 'javascript'
                ? 'border-emerald-700 '
                : 'border-transparent'
            }`}
            onClick={() => exploreRepos('javascript')}
          />
          <img
            src='/typescript.svg'
            alt='TypeScript logo'
            className={`h-11 sm:h-20 border-2  rounded-md cursor-pointer ${
              selectedLanguage === 'typescript'
                ? 'border-emerald-700'
                : 'border-transparent'
            }`}
            onClick={() => exploreRepos('typescript')}
          />
          <img
            src='/c++.svg'
            alt='C++ logo'
            className={`h-11 sm:h-20 border-2  rounded-md cursor-pointer ${
              selectedLanguage === 'c++'
                ? 'border-emerald-700 '
                : 'border-transparent'
            }`}
            onClick={() => exploreRepos('c++')}
          />
          <img
            src='/python.svg'
            alt='Python logo'
            className={`h-11 sm:h-20 border-2  rounded-md cursor-pointer ${
              selectedLanguage === 'python'
                ? 'border-emerald-700 '
                : 'border-transparent'
            }`}
            onClick={() => exploreRepos('python')}
          />
          <img
            src='/java.svg'
            alt='Java logo'
            className={`h-11 sm:h-20 border-2  rounded-md cursor-pointer ${
              selectedLanguage === 'java'
                ? 'border-emerald-700 '
                : 'border-transparent'
            }`}
            onClick={() => exploreRepos('java')}
          />
        </div>

        {popularRepos.length > 0 && (
          <h2 className='text-lg font-semibold text-center my-4'>
            <span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
              {selectedLanguage.toUpperCase()}{' '}
            </span>
            Repositories
          </h2>
        )}

        {!loading ? (
          popularRepos.length > 0 && (
            <Repos repos={popularRepos} alwaysFullWidth />
          )
        ) : (
          <Spinner />
        )}
        {/* {loading && } */}
      </div>
    </div>
  )
}

export default ExplorePage
