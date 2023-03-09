import { Octokit } from 'octokit'
const { paginateRest } = require("@octokit/plugin-paginate-rest");

export const octokit = new Octokit({
  auth: process.env.VUE_APP_API,
  plugins: [paginateRest],
})