package com.homepulse.entities.userEmpSecretory;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.homepulse.entities.admin.Society;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Users {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    @Column(name = "fname")
    private String fname;
    @Column(name = "lname")
    private String lname;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "contact")
    private String contact;
    @Column(name = "role")
    private String role;
    @Column(name = "flag")
    private boolean flag;
    @Column(name = "approval")
    private boolean approval;

    @ManyToOne
    @JoinColumn(name = "society_name")
    @JsonIgnoreProperties({"userList", "Location"}) //prevent circuler ref
    private Society societyId;

    @Column(name = "flat_no")
    private String room_no;
    @Column(name = "wing")
    private String wing;
}
