import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      <table>
        <tr>
          <th>User</th>
          <th>Repo</th>
          <th>Watchers</th>
        </tr>
      {props.repos.map((repo) => {
        return (
          <tr>
            <td className="user"><img src={repo.avatar}></img>{repo.user}</td>
            <td className="repo"><a href={repo.git_URL}>{repo.repo_name}</a></td>
            <td className="watchers">{repo.watchers}</td>
          </tr>
        );
      })}
      </table>
    </div>
  </div>
)

export default RepoList;