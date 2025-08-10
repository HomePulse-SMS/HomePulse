package com.homepulse.entities.userEmpSecretory;

import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.homepulse.entities.admin.Society;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Users implements UserDetails{
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

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "society_name")
    @JsonIgnoreProperties({"userList", "location"}) //prevent circuler ref
//    @JsonBackReference
    private Society societyId;

    @Column(name = "flat_no")
    private String room_no;
    @Column(name = "wing")
    private String wing;
    

    @JsonIgnore
	public Collection<GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(this.role);
		return authorities;
	}


	@Override
	public String getUsername() {
		return this.email;

	}
}
