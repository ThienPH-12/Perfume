package com.example.Perfume.api.bean.req;

public class RefreshReq {
    private String oldRefreshToken;
    private String oldAccessToken;

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

    public String getOldAccessToken() {
        return oldAccessToken;
    }

    public void setOldAccessToken(String oldAccessToken) {
        this.oldAccessToken = oldAccessToken;
    }
}
