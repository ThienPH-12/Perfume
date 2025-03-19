package com.example.Perfume.api.bean.req;


public class BlogReq {

    private String blogTitle;
    private String blogContent;
    private String createUserId;
 

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    public String getBlogContent() {
        return blogContent;
    }

    public void setBlogContent(String blogContent) {
        this.blogContent = blogContent;
    }

    public BlogReq(String blogTitle, String blogContent, String createUserName) {
        this.blogTitle = blogTitle;
        this.blogContent = blogContent;
        this.createUserId = createUserName;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

}
