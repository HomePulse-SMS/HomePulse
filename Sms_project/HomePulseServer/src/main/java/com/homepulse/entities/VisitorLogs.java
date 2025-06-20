package com.homepulse.entities;


import com.homepulse.entities.userEmpSecretory.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "visitor_logs")
public class VisitorLogs {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int Id;
    @Column(name = "name")
    private String name;
    @Column(name = "type")
    private String type;
    @Column(name = "vehicle_number")
    private String vehicleNumber;
    @Column(name = "contact_number")
    private String contactNumber;
    @Column(name = "entry_time")
    private LocalDateTime entryTime;
    @Column(name = "exit_time")
    private LocalDateTime exitTime;
    @Column(name = "photo_url")
    private String photoUrl;
    @Column(name = "is_verified")
    private boolean isVerified;
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users usersId;

    @ManyToOne
    @JoinColumn(name = "guard_id", nullable = false)
    private Users guardId;

}
