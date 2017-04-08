const https = require('https');

// GitHub API communication functions

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
            // console.log(resp.statusCode);
            resp.setEncoding('utf8');
            resp.on('data', function (chunk) {
                console.log('GitHub API Response: ' + chunk);
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

module.exports = {
  createFile,
  getFile,
  updateFile
};
