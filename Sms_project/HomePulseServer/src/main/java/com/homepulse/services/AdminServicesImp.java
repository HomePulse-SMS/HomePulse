package com.homepulse.services;

import com.homepulse.daos.admin.LocationDao;
import com.homepulse.daos.admin.SocietyDao;
import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServicesImp implements AdminServices{

    private LocationDao locationDao;
    private SocietyDao societyDao;

    @Autowired
    public AdminServicesImp(LocationDao locationDao, SocietyDao societyDao) {
        this.locationDao = locationDao;
        this.societyDao = societyDao;
    }

    // add new Society
    @Override
    public void addSociety(Society society) {
        societyDao.save(society);
    }

    // add new Location
    @Override
    public void addLocation(Location location) {
        locationDao.save(location);
    }
}
