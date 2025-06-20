package com.homepulse.services;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;

import java.util.List;

public interface AdminServices {
    void addSociety(Society society);
    void addLocation(Location location);

    List<Society> findAllSociety();
    List<Location> findAllLocation();

    List<Society> findByLocationId_Id(int id);



}
