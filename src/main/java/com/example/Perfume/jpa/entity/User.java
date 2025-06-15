/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.jpa.entity;

/**
 *
 * @author badao
 */
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "[User]")
public class User extends AbstractEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId")
    private Integer userId;

    @Column(name = "UserName", length = 30, nullable = false)
    private String userName;

    @Column(name = "Password")
    private String password;

    @Column(name = "Gender")
    private int gender;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "Email", length = 30)
    private String email;

    @Column(name = "Address")
    private String address;

    @Column(name = "Authority", length = 10)
    private String authority;

    @Column(name = "Activation", length = 10)
    private String activation;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(authority));
    }

    public User() {
    }

    public User(Integer userId, String userName, String password, int gender, Integer age, String email, String address, String authority, String activation) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.address = address;
        this.authority = authority;
        this.activation = activation;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getActivation() {
        return activation;
    }

    public void setActivation(String activation) {
        this.activation = activation;
    }

    public Map<String, Object> getAdditionalAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("userId", userId);
        attributes.put("gender", gender);
        attributes.put("age", age);
        attributes.put("email", email);
        attributes.put("address", address);
        attributes.put("authority", authority);
        attributes.put("activation", activation); // Include activation
        return attributes;
    }

}
