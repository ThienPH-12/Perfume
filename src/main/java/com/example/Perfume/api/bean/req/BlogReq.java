package com.example.Perfume.api.bean.req;


public class BlogReq {

    private String blogTitle;
    private String blogContent;
 

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
    }

}
