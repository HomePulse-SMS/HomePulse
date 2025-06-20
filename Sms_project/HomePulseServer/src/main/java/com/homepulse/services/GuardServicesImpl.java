package com.homepulse.services;

import com.homepulse.daos.guard.GuardDao;
import com.homepulse.daos.users.UsersDao;
import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.userEmpSecretory.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GuardServicesImpl implements GuardServices {

    @Autowired
    private GuardDao guardDao;

    @Autowired
    private UsersDao usersDao;

    @Override
    public void addVisitor(VisitorLogs visitorLogs) {

        // Adding timestamps
        visitorLogs.setEntryTime(LocalDateTime.now());
        visitorLogs.setCreatedTime(LocalDateTime.now());
        visitorLogs.setUpdatedTime(LocalDateTime.now());

        guardDao.save(visitorLogs);
    }

    @Override
    public List<VisitorLogs> findByExitTimeIsNull() {
        return guardDao.findByExitTimeIsNull();
    }

    @Override
    public void updateExitTimeById(int id) {
        int updatedRow = guardDao.updateExitTimeById(id);
        if (updatedRow == 0) {
            throw new RuntimeException("User Not Found or Already Exited");
        }
    }

    @Override
    public List<VisitorLogs> findByVerifiedIsFalse() {
        return guardDao.findByIsVerifiedFalse();
    }
}
