<template>
  <div class="repo">
    <div class="repo__top">
      <h2>Last pushed repositories</h2>
      <div class="repo__top-searchbar">
        <input type="text" placeholder="Find a repo...">
        <span></span>
      </div>
    </div>
    <div class="repo__list">
      <table>
        <tr>
          <th>Name</th>
          <th>Commits Number</th>
          <th>Stars Number</th>
          <th>Language</th>
          <th>Updated at</th>
          <th>Created at</th>
        </tr>

        <tr v-for="(repo, index) in repositories" :key="repo.id">
          <td>{{ repo.name }}</td>
          <td>{{ commitsNumber[index] }}</td>
          <td>{{ repo.stargazers_count }}</td>
          <td>{{ repo.language }}</td>
          <td>{{ new Date(repo.updated_at).toLocaleString() }}</td>
          <td>{{ new Date(repo.created_at).toLocaleString() }}</td>
        </tr>

      </table>

      <a href="#">Show more</a>
    </div>
  </div>
</template>

<script>
import {octokit} from "@/services/api/octokit";
import {countCommits} from "@/utils/github";

export default {
  name: "ProfileRepo",
  props: {
    usernameGitHub: {type: String, required: true},
  },
  data: () => {
    return {
      repositories: null,
      commitsNumber: [],
    }
  },
  created() {
    this.retrieveUserRepos()
  },
  methods: {
    async retrieveUserRepos() {
      const response = await octokit.request("GET /users/{username}/repos?type=all&sort=pushed&per_page=5", {
        username: this.usernameGitHub,
      })
      this.repositories = response.data
      await this.retrieveCommitsNumbers(this.repositories)
    },
    async retrieveCommitsNumbers(repositories) {
      for (const repository of repositories) {
        const currentRepoCommits = await countCommits(repository.owner.login, repository.name, repository.default_branch, this.usernameGitHub)
        this.commitsNumber.push(currentRepoCommits)
      }
    },
  },
}

</script>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

.repo {
  margin-top: $spacing;
  background: white;
  border-radius: $inputBorderRadius;
  padding: 10px 20px 10px 20px;
  box-shadow: $shadowDefault;
}

.repo__top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-searchbar {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin-bottom: 15px;
    margin-top: 15px;

    input {
      border: 1px solid black;
      box-shadow: $shadowInput;
      border-radius: $inputBorderRadius;
      outline: none;
      font-style: italic;
      padding: 10px;
      width: 85%;
    }

    span {
      border: 1px solid black;
      box-shadow: $shadowInput;
      display: block;
      background-color: #74A3FF;
      border-radius: $inputBorderRadius;
      width: 10%;
    }
  }
}

.repo__list > a {
  display: block;
  width: 100%;
  color: black;
  text-align: center;
  text-decoration: underline;
}

table {
  border-spacing: 10px;
  width: 100%;
  margin-bottom: 10px;

  tr, td {
    text-align: left;
  }
}

</style>