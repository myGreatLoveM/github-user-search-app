import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos'
import Spinner from '../components/Spinner'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

function HomePage() {
  const [user, setUser] = useState(null)
  const [userRepos, setUserRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState('recent')

  const searchRef = useRef(null)

  const getUserProfileAndRepos = useCallback(
    async (username = 'myGreatLoveM') => {
      setLoading(true)
      try {
        const userResp = await fetch(
          `http://localhost:5000/api/users/profile/${username}`
        )
        const {
          data: { userInfo, userReposInfo },
        } = await userResp.json()

        if (userResp.ok) {
          setUser(userInfo)

          userReposInfo.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
          setUserRepos(userReposInfo)

          return { userInfo, userReposInfo }
        } else {
          throw new Error('')
        }
      } catch (error) {
        throw new Error('No such user found')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])

  const onSearch = async (username) => {
    if (!username) {
      toast.error('Please enter a username')
      return
    }

    setLoading(true)
    setUserRepos([])
    setUser(null)
    setSortType('recent')
    try {
      const { userInfo, userReposInfo } = await getUserProfileAndRepos(username)
      setUser(userInfo)
      setUserRepos(userReposInfo)
      toast.success('User found')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onSort = (sortType) => {
    if (sortType === 'recent') {
      userRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) //descending, recent first
    } else if (sortType === 'stars') {
      userRepos.sort((a, b) => b.stargazers_count - a.stargazers_count) //descending, most stars first
    } else if (sortType === 'forks') {
      userRepos.sort((a, b) => b.forks_count - a.forks_count) //descending, most forks first
    }
    setSortType(sortType)
    setUserRepos([...userRepos])
  }

  console.log('user', user)

  return (
    <div className=''>
      <Search onSearch={onSearch} loading={loading} searchRef={searchRef} />

      {userRepos.length > 0 && (
        <SortRepos sortType={sortType} onSort={onSort} />
      )}

      <div className='flex flex-col lg:flex-row gap-4 justify-center items-start'>
        {!loading ? (
          <>
            {user ? (
              <ProfileInfo userProfile={user} />
            ) : (
              <button
                type='button'
                className={`py-2.5 px-5 mt-10 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass border border-yellow-600`}
                onClick={() => searchRef.current.focus()}
              >
                Try Again
              </button>
            )}
            {userRepos.length > 0 && <Repos repos={userRepos} />}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default HomePage
