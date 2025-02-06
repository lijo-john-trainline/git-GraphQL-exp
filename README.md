# GitHub Contributions Fetcher

This Node.js script fetches GitHub contributions (pull requests, reviews, issues, and commits) for a specified time period, grouped by repositories, using GitHub's GraphQL API.

## Prerequisites

Node.js (v20 recommended)

A GitHub Personal Access Token (PAT) with repo and read:user permissions

## Setup Instructions

Clone or download the script

```bash
git clone https://github.com/your-repo/github-contributions-fetcher.git
cd github-contributions-fetcher
```

## Install dependencies

```bash
yarn install
```

## Set up variables inside index.js

```bash
const GIT_PAT = "your_github_personal_access_token";
const USER_NAME = "your_github_username";
```

## Running the Script

Execute the script using:

```bash
node index.js
```

Expected Output

The script fetches contributions for the given time period and prints a table like this:

| Index | Repository | PRs | Reviews | Issues | Commits |
|-------|-----------|-----|---------|--------|---------|
| 0     | Repo1     | 10  | 5       | 2      | 20      |
| 1     | Repo2     | 7   | 3       | 1      | 15      |
| 2     | Repo3     | 12  | 8       | 4      | 25      |

Customization

Modify the time range inside the script
Adjust the max repositories returned in the GraphQL query.