/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.api.bean.res;

/**
 *
 * @author badao
 */

public class ErrorRes {
    private String message;
    private String details;

    public ErrorRes(String message, String details) {
        this.message = message;
        this.details = details;
    }

    // Getters and Setters
}
