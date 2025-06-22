package com.example.Perfume.api.bean.req;


public class BlogReq {

    private String blogTitle;
    private String blogContent;
    private Integer blogId; // Rename id to blogId

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

    public Integer getBlogId() {
        return blogId;
    }

    public void setBlogId(Integer blogId) {
        this.blogId = blogId;
    }

    public BlogReq(String blogTitle, String blogContent, Integer blogId) {
        this.blogTitle = blogTitle;
        this.blogContent = blogContent;
        this.blogId = blogId;
    }

}
