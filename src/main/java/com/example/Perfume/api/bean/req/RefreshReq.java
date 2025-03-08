package com.example.Perfume.api.bean.req;

public class RefreshReq {
    private String oldRefreshToken;

    public RefreshReq() {}

    public RefreshReq(String oldToken) {
        this.oldRefreshToken = oldToken;
    }

    public String getOldRefreshToken() {
        return oldRefreshToken;
    }

    public void setOldRefreshToken(String oldRefreshToken) {
        this.oldRefreshToken = oldRefreshToken;
    }
}
