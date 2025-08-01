package com.homepulse.entities.admin;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "secretory_register")
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class SecretoryRegister {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    int id;
    @Column(name = "email")
    String email;
    @Column(name = "password")
    String password;

    @OneToOne
    @JoinColumn(name = "society_id")
    private Society society;
}
