package com.homepulse.entities.admin;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Entity
@Table(name = "location")
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class Location {
	@GeneratedValue(strategy=GenerationType.IDENTITY )
	@Id
	private int id;
	@Column(name="country")
	private String country;
	@Column(name="state")
	private String state;
	@Column(name="city")
	private String city;
	@Column(name="district")
	private String district;

	@JsonIgnore
	@OneToMany(mappedBy = "location")
	private List<Society> societyList;

}
