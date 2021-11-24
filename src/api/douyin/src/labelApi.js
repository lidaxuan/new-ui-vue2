const labelApi = {
    //标签列表
    getTagList: {
        method: 'post',
        url: '/channel-tag/get-tag-list',
    },
    // 添加标签
    addChannelTag: {
        method: 'post',
        url: '/channel-tag/add-channel-tag',
    },
    // 修改标签信息
    updateChannelTag: {
        method: 'post',
        url: '/channel-tag/update-channel-tag',
    },
    // 删除标签
    delChannelTag: {
        method: 'post',
        url: '/channel-tag/del-channel-tag',
    },
    
};
export default labelApi;
