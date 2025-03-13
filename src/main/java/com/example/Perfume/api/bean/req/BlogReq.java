package com.example.Perfume.api.bean.req;

import org.springframework.web.multipart.MultipartFile;

public class BlogReq {

    private String blogTitle;
    private String blogContent;
    private String createUserName;
    MultipartFile imageFile;

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

    public BlogReq(String blogTitle, String blogContent, String createUserName, MultipartFile imageFile) {
        this.blogTitle = blogTitle;
        this.blogContent = blogContent;
        this.createUserName = createUserName;
        this.imageFile = imageFile;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public MultipartFile getImageFile() {
        return imageFile;
    }

    public void setImageFile(MultipartFile imageFile) {
        this.imageFile = imageFile;
    }

   
}
