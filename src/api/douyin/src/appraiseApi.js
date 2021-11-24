const appraiseApi = {
    //授权账号
    getAuthList: {
        method: 'post',
        url: '/douyin/get-auth-list',
    },
    // 获取抖音号视频列表
    getVideoList: {
        method: 'post',
        url: '/douyin/get-video-list',
    },
    // 获取抖音号视频评论列表
    getCommentList: {
        method: 'post',
        url: '/douyin/get-comment-list',
    },
    // 获取抖音号视频评论回复列表
    getCommReplyList: {
        method: 'post',
        url: '/douyin/get-comm-reply-list',
    },
    // 添加抖音评论回复
    sendComment: {
        method: 'post',
        url: '/douyin/send-comment',
    },
    // 添加抖音评论置顶
    sendCommentTop: {
        method: 'post',
        url: '/douyin/comment-top',
    }
    
}

export default appraiseApi