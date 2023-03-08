import { octokit } from '@/services/api/octokit'

const countCommits = async function (
  repoAuthor, repo, branch, username = repoAuthor) {

  const response = await octokit.request(
    'GET /repos/{repoAuthor}/{repo}/commits?author={username}&sha={branch}&per_page=1&page=1',
    { repoAuthor, repo, branch, username },
  )

  const link = response.headers.link
  // We get the page number generated in the header response in order to have the commits number
  // This trick let us have more than the last 30 results
  return link.split(',')[1].match(/.*page=(?<page_num>\d+)/).groups.page_num
}

export { countCommits }