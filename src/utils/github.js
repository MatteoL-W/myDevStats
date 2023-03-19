import { octokit } from '@/services/api/octokit'

const countCommits = async (repoAuthor, repo, branch, username) => {
  let response;
  if (username) {
    response = await octokit.request(
        'GET /repos/{repoAuthor}/{repo}/commits?author={username}&sha={branch}&per_page=1&page=1',
        { repoAuthor, repo, branch, username },
    )
  } else {
    response = await octokit.request(
        'GET /repos/{repoAuthor}/{repo}/commits?sha={branch}&per_page=1&page=1',
        { repoAuthor, repo, branch, username },
    )
  }

  const link = response.headers.link
  // We get the page number generated in the header response in order to have the commits number
  // This trick let us have more than the last 30 results
  return link?.split(',')[1].match(/.*page=(?<page_num>\d+)/).groups.page_num
}

const retrieveCommitsNumber = async (repositories, author) => {
  for (let repository of repositories) {
    repository.commitsNumber = await countCommits(repository.owner.login,
      repository.name, repository.default_branch, author)
    repository.allCommitsNumber = await countCommits(repository.owner.login,
        repository.name, repository.default_branch, null)
  }
}

const retrieveUserRepos = async (username, page) => {
  const response = await octokit.request(
    'GET /users/{username}/repos?type=all&sort=pushed&per_page=5&page={page}',
    { username, page },
  )
  let repositories = response.data
  await retrieveCommitsNumber(repositories, username)
  return repositories
}

export const retrieveRepoInfo = async (owner, repo) => {
  const response = await octokit.request(
      'GET /repos/{owner}/{repo}',
      { owner, repo },
  )
  return response.data
}

export { countCommits, retrieveUserRepos, retrieveCommitsNumber }