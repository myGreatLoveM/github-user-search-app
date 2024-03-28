export async function getUserInfoAndRepos(req, res) {
  const { username } = req.params
  try {
    const userResp = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    })
    const userInfo = await userResp.json()
   
    const userReposResp = await fetch(userInfo?.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    })
    const userReposInfo = await userReposResp.json()

    return res.status(200).json({
      success: true,
      data: {
        userInfo,
        userReposInfo,
      },
    })

  } catch (error) {
    console.log(error)
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
