package com.homepulse.services;

import com.homepulse.daos.admin.LocationDao;
import com.homepulse.daos.admin.SocietyDao;
import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServicesImpl implements AdminServices{

    private LocationDao locationDao;
    private SocietyDao societyDao;

    @Autowired
    public AdminServicesImpl(LocationDao locationDao, SocietyDao societyDao) {
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

    @Override
    public List<Society> findAllSociety() {
        return societyDao.findAll();
    }

    @Override
    public List<Location> findAllLocation() {
        return locationDao.findAll();
    }

    @Override
    public List<Society> findByLocationId_Id(int id) {
        return societyDao.findByLocation_Id(id);
    }
}
