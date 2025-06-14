package com.homepulse.entities.admin;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

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
	@JsonBackReference
	private Location location;
}
