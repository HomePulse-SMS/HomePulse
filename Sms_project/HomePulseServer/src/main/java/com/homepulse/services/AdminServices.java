package com.homepulse.services;

import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import com.homepulse.repository.SocietyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface AdminServices {

    void addSociety(Society society);
    void addLocation(Location location);

    List<Location> findLocation();
    List<Society> getAllSocities();
}
