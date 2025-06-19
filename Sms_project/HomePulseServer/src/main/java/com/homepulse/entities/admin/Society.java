package com.homepulse.entities.admin;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.homepulse.entities.userEmpSecretory.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Table(name="society")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Society {
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Id
	private int id;
	@Column(name = "society_name")
	private String sname;
	@Column(name="subcity")
	private String subcity;

	@ManyToOne
	@JoinColumn(name = "location_id")
	@JsonIgnoreProperties({"societyList"}) //avoid circular refs
	private Location location;

	@OneToMany(mappedBy = "societyId")
	@JsonIgnore
	private List<Users> usersList;
}
