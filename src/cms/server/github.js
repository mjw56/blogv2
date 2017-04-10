const https = require('https');
var Octokat = require('octokat');

// GitHub API communication functions

const defaults = {
  branchName: 'master',
  token: '',
  username: '',
  reponame: ''
};

// retrieve a file contents for a given owner and repo
function getFile(owner, repo, file) {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'api.github.com',
            port: 443,
            path: `/repos/${owner}/${repo}/contents/${file}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Redacted'
            }
        };

        let str = '';

        const req = https.request(options, function(res) {
            // console.log(res.statusCode);
            res.on('data', function(d) {
                // process.stdout.write(d);
                str = `${str}${d}`;
            }).on('end', function() {
                try {
                    const json = JSON.parse(str);
                    resolve(json);
                } catch(e) {
                    console.error(`failed to JSON parse response ${e}`)
                    reject(e);
                }
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
            reject(e);
        });
    });
}

// update a file in a repo with a sha
function updateFile(owner, repo, file, commit, content, sha, token) {
    return new Promise(function(resolve, reject) {
        // PUT /repos/:owner/:repo/contents/:path
        // Parameters
        // Name	Type	Description
        // path	string	Required. The content path.
        // message	string	Required. The commit message.
        // content	string	Required. The updated file content, Base64 encoded.
        // sha	string	Required. The blob SHA of the file being replaced.
        // branch	string	The branch name. Default: the repository’s default branch (usually master)

        const data = JSON.stringify({
            message: commit,
            content,
            sha,
            committer: {
                name: "Redacted",
                email: "cosmo@galaksi"
            }
        });

        const options = {
            host: 'api.github.com',
            port: 443,
            path: `/repos/${owner}/${repo}/contents/${file}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Redacted',
                'Authorization': `token ${ token }`,
            }
        };

        const put_req = https.request(options, function(resp) {
            // console.log(resp.statusCode);
            resp.setEncoding('utf8');
            resp.on('data', function (chunk) {
                console.log('GitHub API Response: ' + chunk);
            });
            resp.on('end', function() {
                resolve();
            });
        }, function(err) {
            console.log('error', err);
            reject();
        });

        put_req.write(data);
        put_req.end();
    });
}

// create a file in a repo
function createFile(owner, repo, path, commit, content, token) {
    return new Promise(function(resolve, reject) {
        const data = JSON.stringify({
            message: commit,
            content,
            committer: {
                name: "Redacted",
                email: "cosmo@galaksi"
            }
        });

        const options = {
            host: 'api.github.com',
            port: 443,
            path: `/repos/${owner}/${repo}/contents/${path}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Redacted',
                'Authorization': `token ${ token }`,
            }
        };

        const put_req = https.request(options, function(resp) {
            console.log(resp.statusCode);
            resp.setEncoding('utf8');
            resp.on('data', function (chunk) {
                console.log('GitHub API Response: ' + chunk);
                // resolve();
            });
            resp.on('end', function() {
                resolve();
            });
        }, function(err) {
            console.log('error', err);
            reject();
        });

        put_req.write(data);
        put_req.end();
    });
}

function multiFileCommit(options) {
  options = Object.assign({}, defaults, options);
  var head;

  var octo = new Octokat({
    token: options.token
  });
  var repo = octo.repos(options.username, options.reponame);

  function fetchHead() {
    return repo.git.refs.heads(options.branchName).fetch();
  }

  function fetchTree() {
    return fetchHead().then(function(commit) {
      head = commit;
      return repo.git.trees(commit.object.sha).fetch();
    });
  }

  function commit(files, message) {
    return Promise.all(files.map(function(file) {
      return repo.git.blobs.create({
        content: file.content,
        encoding: 'utf-8'
      });
    })).then(function(blobs) {
      return fetchTree().then(function(tree) {
        return repo.git.trees.create({
          tree: files.map(function(file, index) {
            return {
              path: file.path,
              mode: '100644',
              type: 'blob',
              sha: blobs[index].sha
            };
          }),
          basetree: tree.sha
        });
      });
    }).then(function(tree) {
      return repo.git.commits.create({
        message: message,
        tree: tree.sha,
        parents: [
          head.object.sha
        ]
      });
    }).then(function(commit) {
      return repo.git.refs.heads(options.branchName).update({
        sha: commit.sha
      });
    });

  }

  return {
    commit: commit
  };
}

module.exports = {
  createFile,
  getFile,
  updateFile,
  multiFileCommit
};
