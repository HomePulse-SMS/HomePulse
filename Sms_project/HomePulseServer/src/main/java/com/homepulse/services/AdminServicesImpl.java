package com.homepulse.services;

import com.homepulse.daos.admin.LocationDao;
import com.homepulse.daos.admin.SecretoryRegisterDao;
import com.homepulse.daos.admin.SocietyDao;
import com.homepulse.daos.guard.GuardDao;
import com.homepulse.entities.admin.Location;
import com.homepulse.entities.admin.Society;
import com.homepulse.entities.userEmpSecretory.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServicesImpl implements AdminServices{

    private LocationDao locationDao;
    private SocietyDao societyDao;
    private GuardDao guardDao;
    private SecretoryRegisterDao secretoryRegisterDao;

    @Autowired
    private PasswordEncoder passen;

    @Autowired
    public AdminServicesImpl(LocationDao locationDao, SocietyDao societyDao, GuardDao guardDao, SecretoryRegisterDao secretoryRegisterDao) {
        this.locationDao = locationDao;
        this.societyDao = societyDao;
        this.guardDao = guardDao;
        this.secretoryRegisterDao = secretoryRegisterDao;
    }

    // add new Society
//    @Override
//    public void addSociety(Society society) {
//        societyDao.save(society);
//    }
    
    @Override
    public void addSociety(Society society) {
        int locationId = society.getLocation().getId();

        // 1. Location fetch from DB
        Location location = locationDao.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location with ID " + locationId + " not found"));

        // 2. Location set
        society.setLocation(location);

        // 3. Save society
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

    @Override
    public Users addSecretory(Users newSecretory) {
        newSecretory.setPassword(passen.encode(newSecretory.getPassword()));
        newSecretory.setRole("SECRETARY");
        newSecretory.setFlag(false);
        newSecretory.setApproval(true);

        return secretoryRegisterDao.save(newSecretory);
    }

}
