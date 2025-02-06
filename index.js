import {graphql} from "@octokit/graphql";

//https://github.com/settings/tokens
const GIT_PAT = 'your_token';

const USER_NAME = 'your_user_name'


const graphqlWithAuth = graphql.defaults({
  headers: {
      authorization: `token ${GIT_PAT}`,
  },
});

async function fetchData() {
  try {
      const {
          user
      } = await graphqlWithAuth(`
      query { user(login: "${USER_NAME}") {
              contributionsCollection(from: "2024-02-06T00:00:00Z", to: "2025-02-06T23:59:59Z") {
              pullRequestContributionsByRepository{
                  repository {
                      name
                  }
                  contributions {
                      totalCount
                  }
              }
              pullRequestReviewContributionsByRepository{
                  repository {
                  name
                  }
                  contributions {
                  totalCount
                  }
              }
              issueContributionsByRepository{
                  repository {
                  name
                  }
                  contributions {
                  totalCount
                  }
              }
              commitContributionsByRepository{
                  repository {
                  name
                  }
                  contributions {
                  totalCount
                  }
              }
              }
          }
        }
    `);

      const map = new Map();

      user?.contributionsCollection?.pullRequestContributionsByRepository?.map((data) => {
        const repository = data?.repository?.name;
          map.set(repository, {
              Repository: repository,
              PRs: data?.contributions?.totalCount
          });
      });

      user?.contributionsCollection?.pullRequestReviewContributionsByRepository?.map((data) => {
        const repository = data?.repository?.name;
          map.set(repository, {
              ...map.get(data?.repository?.name),
              Reviews: data?.contributions?.totalCount
          });
      });

      user?.contributionsCollection?.issueContributionsByRepository?.map((data) => {
        const repository = data?.repository?.name;
          map.set(repository, {
              ...map.get(data?.repository?.name),
              Issues: data?.contributions?.totalCount
          });
      });

      user?.contributionsCollection?.commitContributionsByRepository?.map((data) => {
        const repository = data?.repository?.name;
          map.set(repository, {
              ...map.get(data?.repository?.name),
              Commits: data?.contributions?.totalCount
          });
      });

      const array = Array.from(map, ([name, value]) => ({
          Repository: name,
          ...value
      }));
      console.table(array);
  } catch (error) {
      // Handle different error cases
      if (error.status === 401) {
          console.error("❌ Authentication failed: Invalid token");
      } else if (error.status === 403) {
          console.error("❌ Rate limit exceeded. Try again later.");
      } else if (error.errors) {
          console.error("❌ GraphQL Query Error:", error.errors);
      } else {
          console.error("❌ Unexpected Error:", error.message);
      }
  }
}

fetchData();