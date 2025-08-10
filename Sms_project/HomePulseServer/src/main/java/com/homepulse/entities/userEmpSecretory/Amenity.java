package com.homepulse.entities.userEmpSecretory;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.homepulse.entities.admin.Society;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(name = "created_by_id", nullable = false)
    private Integer createdById;

    @Column(nullable = false)
    private Boolean active = true;  // add this field

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column
    private Integer capacity;  // nullable

    @Column(name = "requires_approval")
    private Boolean requiresApproval; // nullable
    
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if (active == null) {
            active = true;
        }
    }
}