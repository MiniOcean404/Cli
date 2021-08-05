const request = require('./request')

// 获取模板列表
function getRepoList() {
    return request({
        method: 'GET',
        url: 'https://api.github.com/orgs/zhurong-cli/repos'
    })
}

// 获取版本信息
function getTagList(repo) {
    return request({
        url: `https://api.github.com/repos/zhurong-cli/${repo}/tags`
    })
}

module.exports = {
    getRepoList,
    getTagList
}