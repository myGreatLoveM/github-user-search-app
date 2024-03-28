export async function explorePopularRepos(req, res) {
    const {language} = req.params
    try {
        const reposRes = await fetch(
          `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
          {
            headers: {
              authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
          }
        )
        const reposData = await reposRes.json()

        return res.status(200).json({
          success: true,
          data: reposData.items,
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