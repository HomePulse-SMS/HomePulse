package com.homepulse.entities.Admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name="society")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Society {
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Id
	private int id;
	@Column(name = "location_id")
	private int loc_id;
	@Column(name = "society_name")
	private String sname;
	@Column(name="subcity")
	private String subcity;
}
